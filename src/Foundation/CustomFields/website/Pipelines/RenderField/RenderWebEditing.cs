using Sitecore;
using Sitecore.Collections;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.Pipelines.GetChromeData;
using Sitecore.Pipelines.RenderField;
using Sitecore.Shell;
using Sitecore.Sites;
using Sitecore.StringExtensions;
using Sitecore.Text;
using Sitecore.Web;
using Sitecore.Web.UI.HtmlControls;
using Sitecore.Web.UI.PageModes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;

namespace Learning.Foundation.Pipelines.RenderField
{
    public class RenderWebEditing
    {
        public void Process(RenderFieldArgs args)
        {
            if (args != null && (args.FieldTypeKey == "lazy load image"))
            {
                Assert.ArgumentNotNull((object)args, nameof(args));
                if (!RenderWebEditing.CanRenderField(args))
                    return;
                Field field = args.Item.Fields[args.FieldName];
                Item obj = field.Item;
                string str = obj[FieldIDs.Revision].Replace("-", string.Empty);
                string controlID = "fld_" + (object)obj.ID.ToShortID() + "_" + (object)field.ID.ToShortID() + "_" + (object)obj.Language + "_" + (object)obj.Version + "_" + str + "_" + (object)MainUtil.GetSequencer();
                HtmlTextWriter output = new HtmlTextWriter((TextWriter)new StringWriter());
                if (args.EnclosingTag.Length > 0)
                    output.Write("<{0}>", (object)args.EnclosingTag);
                string rawValueContainer = this.GetRawValueContainer(field, controlID);
                output.Write(rawValueContainer);
                if (args.DisableWebEditContentEditing && args.DisableWebEditFieldWrapping)
                    this.RenderWrapperlessField(output, args, field, controlID);
                else
                    this.RenderWrappedField(output, args, field, controlID);
            }
        }

        /// <summary>The can render field.</summary>
        /// <param name="args">The args.</param>
        /// <returns>
        /// The <see cref="T:System.Boolean" />.
        /// </returns>
        public static bool CanRenderField(RenderFieldArgs args)
        {
            if (!RenderWebEditing.CanWebEdit(args) && !args.WebEditParameters.ContainsKey("sc-highlight-contentchange") || args.Item == null || !RenderWebEditing.CanEditItem(args.Item))
                return false;
            Field field = args.Item.Fields[args.FieldName];
            return field != null && field.CanUserWrite(Context.User);
        }

        /// <summary>
        /// Determines whether this instance [can edit item] the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>
        /// 	<c>true</c> if this instance [can edit item] the specified item; otherwise, <c>false</c>.
        /// </returns>
        private static bool CanEditItem(Item item)
        {
            Assert.ArgumentNotNull((object)item, nameof(item));
            return (Context.IsAdministrator || !item.Locking.IsLocked() || item.Locking.HasLock()) && item.Access.CanWrite() && item.Access.CanWriteLanguage() && !item.Appearance.ReadOnly;
        }

        /// <summary>
        /// Determines whether this instance [can web edit] the specified args.
        /// </summary>
        /// <param name="args">The arguments.</param>
        private static bool CanWebEdit(RenderFieldArgs args)
        {
            if (args.DisableWebEdit)
                return false;
            SiteContext site = Context.Site;
            return site != null && site.DisplayMode == DisplayMode.Edit && !(WebUtil.GetQueryString("sc_duration") == "temporary") && Context.PageMode.IsExperienceEditorEditing;
        }

        /// <summary>Renders the field without a wrapper.</summary>
        /// <param name="output">The output.</param>
        /// <param name="args">The arguments.</param>
        /// <param name="field"> </param>
        /// <param name="controlID"> </param>
        private void RenderWrapperlessField(
          HtmlTextWriter output,
          RenderFieldArgs args,
          Field field,
          string controlID)
        {
            Assert.ArgumentNotNull((object)output, nameof(output));
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.ArgumentNotNull((object)controlID, nameof(controlID));
            Tag fieldTag = RenderWebEditing.CreateFieldTag("code", args, controlID);
            fieldTag.Class = "scpm";
            fieldTag.Add("kind", "open").Add("type", "text/sitecore").Add("chromeType", nameof(field));
            string str = args.Result.FirstPart;
            if (string.IsNullOrEmpty(str))
            {
                fieldTag.Add("scWatermark", "true");
                string defaultText = RenderWebEditing.GetDefaultText(args);
                str = defaultText;
                if (StringUtil.RemoveTags(defaultText) == defaultText)
                    str = "<span class='scTextWrapper'>" + defaultText + "</span>";
            }
            this.AddParameters(fieldTag, args);
            string fieldData = RenderWebEditing.GetFieldData(args, field, controlID);
            fieldTag.InnerHtml = fieldData;
            output.Write(fieldTag.ToString());
            output.Write(str);
            args.Result.FirstPart = output.InnerWriter.ToString();
            Tag tag = new Tag("code") { Class = "scpm" };
            tag.Add("kind", "close").Add("type", "text/sitecore").Add("chromeType", nameof(field));
            args.Result.LastPart += tag.ToString();
        }

        /// <summary>Renders the inline editable field.</summary>
        /// <param name="output">The output.</param>
        /// <param name="args">The arguments.</param>
        /// <param name="field">The field.</param>
        /// <param name="controlID">The control Id.</param>
        private void RenderWrappedField(
          HtmlTextWriter output,
          RenderFieldArgs args,
          Field field,
          string controlID)
        {
            Assert.ArgumentNotNull((object)output, nameof(output));
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.ArgumentNotNull((object)controlID, nameof(controlID));
            string fieldData = RenderWebEditing.GetFieldData(args, field, controlID);
            if (args.Before.Length > 0)
                output.Write(args.Before);
            output.Write("<span class=\"scChromeData\">{0}</span>", (object)fieldData);
            Tag fieldTag = RenderWebEditing.CreateFieldTag(this.GetEditableElementTagName(args), args, controlID);
            fieldTag.Class = "scWebEditInput";
            if (!args.DisableWebEditContentEditing)
                fieldTag.Add("contenteditable", "true");
            string str1 = args.Result.FirstPart;
            string defaultText = RenderWebEditing.GetDefaultText(args);
            fieldTag.Add("scDefaultText", defaultText);
            if (string.IsNullOrEmpty(str1))
            {
                fieldTag.Add("scWatermark", "true");
                str1 = defaultText;
            }
            this.AddParameters(fieldTag, args);
            output.Write(fieldTag.Start());
            output.Write(str1);
            args.Result.FirstPart = output.InnerWriter.ToString();
            string str2 = fieldTag.End();
            if (args.After.Length > 0)
                str2 += args.After;
            if (args.EnclosingTag.Length > 0)
                str2 = string.Format("{1}</{0}>", (object)args.EnclosingTag, (object)str2);
            args.Result.LastPart += str2;
        }

        /// <summary>Adds the parameters.</summary>
        /// <param name="tag">The tag.</param>
        /// <param name="args">The arguments.</param>
        private void AddParameters(Tag tag, RenderFieldArgs args)
        {
            Assert.ArgumentNotNull((object)tag, nameof(tag));
            Assert.ArgumentNotNull((object)args, nameof(args));
            if (args.WebEditParameters.Count <= 0)
                return;
            UrlString urlString = new UrlString();
            foreach (KeyValuePair<string, string> webEditParameter in (SafeDictionary<string, string>)args.WebEditParameters)
                urlString.Add(webEditParameter.Key, webEditParameter.Value);
            tag.Add("sc_parameters", urlString.ToString());
        }

        /// <summary>Gets the name of the editable element tag.</summary>
        /// <param name="args">The arguments.</param>
        /// <returns></returns>
        private string GetEditableElementTagName(RenderFieldArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            string editableElementTagName = "span";
            if ((UIUtil.IsFirefox() || UIUtil.IsWebkit()) && UIUtil.SupportsInlineEditing() && MainUtil.GetBool(args.Parameters["block-content"], false))
                editableElementTagName = "div";
            return editableElementTagName;
        }

        /// <summary>Gets the field value HTML.</summary>
        /// <param name="field">The field.</param>
        /// <param name="controlID">The control ID.</param>
        /// <returns>The field value HTML.</returns>
        private string GetRawValueContainer(Field field, string controlID)
        {
            Assert.ArgumentNotNull((object)field, nameof(field));
            Assert.ArgumentNotNull((object)controlID, nameof(controlID));
            return "<input id='{0}' class='scFieldValue' name='{0}' type='hidden' value=\"{1}\" />".FormatWith((object)controlID, (object)HttpUtility.HtmlEncode(field.Value));
        }

        /// <summary>Gets the default image.</summary>
        /// <param name="args">The args.</param>
        /// <returns>The default image.</returns>
        private static string GetDefaultText(RenderFieldArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            string @string = StringUtil.GetString(args.RenderParameters["default-text"], string.Empty);
            using (new LanguageSwitcher(WebUtil.GetCookieValue("shell", "lang", Context.Language.Name)))
            {
                if (@string.IsNullOrEmpty())
                {
                    Database database = Factory.GetDatabase("core");
                    Assert.IsNotNull((object)database, "core");
                    Item obj = database.GetItem("/sitecore/content/Applications/WebEdit/WebEdit Texts");
                    Assert.IsNotNull((object)obj, "/sitecore/content/Applications/WebEdit/WebEdit Texts");
                    @string = obj["Default Text"];
                }
                if (string.Compare(args.RenderParameters["show-title-when-blank"], "true", StringComparison.InvariantCultureIgnoreCase) == 0)
                    @string = RenderWebEditing.GetFieldDisplayName(args) + ": " + @string;
            }
            return @string;
        }

        /// <summary>Gets the display name of the field.</summary>
        /// <param name="args">The arguments.</param>
        /// <returns>The get field display name.</returns>
        private static string GetFieldDisplayName(RenderFieldArgs args)
        {
            Assert.IsNotNull((object)args, nameof(args));
            Assert.IsNotNull((object)args.Item, "item");
            Item obj;
            if (string.Compare(WebUtil.GetCookieValue("shell", "lang", Context.Language.Name), args.Item.Language.Name, StringComparison.InvariantCultureIgnoreCase) != 0)
            {
                obj = args.Item.Database.GetItem(args.Item.ID);
                Assert.IsNotNull((object)obj, "Item");
            }
            else
                obj = args.Item;
            Field field = obj.Fields[args.FieldName];
            return field != null ? field.DisplayName : args.FieldName;
        }

        /// <summary>Renders the buttons.</summary>
        /// <param name="commands">The commands.</param>
        /// <param name="field">The field.</param>
        /// <param name="controlID"> </param>
        private static void SetCommandParametersValue(
          IEnumerable<WebEditButton> commands,
          Field field,
          string controlID)
        {
            Assert.ArgumentNotNull((object)commands, nameof(commands));
            Assert.ArgumentNotNull((object)field, nameof(field));
            Assert.ArgumentNotNull((object)controlID, nameof(controlID));
            Item obj = field.Item;
            string newValue;
            if (UserOptions.WebEdit.UsePopupContentEditor)
                newValue = "javascript:Sitecore.WebEdit.postRequest(\"webedit:edit(id=" + (object)obj.ID + ",language=" + (object)obj.Language + ",version=" + (object)obj.Version + ")\")";
            else
                newValue = new UrlString(WebUtil.GetRawUrl())
                {
                    ["sc_ce"] = "1",
                    ["sc_ce_uri"] = HttpUtility.UrlEncode(obj.Uri.ToString())
                }.ToString();
            foreach (WebEditButton command in commands)
            {
                if (!string.IsNullOrEmpty(command.Click))
                {
                    string str = command.Click.Replace("$URL", newValue).Replace("$ItemID", obj.ID.ToString()).Replace("$Language", obj.Language.ToString()).Replace("$Version", obj.Version.ToString()).Replace("$FieldID", field.ID.ToString()).Replace("$ControlID", controlID).Replace("$MessageParameters", "itemid=" + obj.ID.ToString() + ",language=" + obj.Language.ToString() + ",version=" + obj.Version.ToString() + ",fieldid=" + field.ID.ToString() + ",controlid=" + controlID).Replace("$JavascriptParameters", "\"" + obj.ID.ToString() + "\",\"" + obj.Language.ToString() + "\",\"" + obj.Version.ToString() + "\",\"" + field.ID.ToString() + "\",\"" + controlID + "\"");
                    command.Click = str;
                }
            }
        }

        /// <summary>Renders the bottom bar.</summary>
        /// <param name="args">The arguments.</paraCanRenderFieldm>
        /// <param name="field">The field.</param>
        /// <param name="controlID"> </param>
        private static string GetFieldData(RenderFieldArgs args, Field field, string controlID)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.ArgumentNotNull((object)field, nameof(field));
            Assert.ArgumentNotNull((object)controlID, nameof(controlID));
            Item obj = field.Item;
            Assert.IsNotNull((object)Context.Site, "site");
            using (new LanguageSwitcher(WebUtil.GetCookieValue("shell", "lang", Context.Site.Language)))
            {
                GetChromeDataArgs args1 = new GetChromeDataArgs(nameof(field), obj, args.Parameters);
                args1.CustomData[nameof(field)] = (object)field;
                args1.CustomData["fieldWebEditParameters"] = (object)args.WebEditParameters;
                GetChromeDataPipeline.Run(args1);
                ChromeData chromeData = args1.ChromeData;
                RenderWebEditing.SetCommandParametersValue((IEnumerable<WebEditButton>)chromeData.Commands, field, controlID);
                return chromeData.ToJson();
            }
        }

        /// <summary>Creates the field tag.</summary>
        /// <param name="tagName">Name of the tag.</param>
        /// <param name="args">The arguments.</param>
        /// <param name="controlID"> </param>
        /// <returns>The field tag.</returns>
        private static Tag CreateFieldTag(string tagName, RenderFieldArgs args, string controlID)
        {
            Assert.ArgumentNotNull((object)tagName, nameof(tagName));
            Assert.ArgumentNotNull((object)args, nameof(args));
            Tag fieldTag = new Tag(tagName)
            {
                ID = controlID + "_edit"
            };
            fieldTag.Add("scFieldType", args.FieldTypeKey);
            return fieldTag;
        }


    }
}