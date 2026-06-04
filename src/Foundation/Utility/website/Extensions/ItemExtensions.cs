using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Web;

namespace Learning.Foundation.Utility.Extensions
{
    public static class ItemExtensions
    {
        /// <summary>
        ///     Gets a string-based value for the following field types: Single-Line Text, Multiline Text, Password, Rich Text.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>String of the field value.</returns>
        private static string GetString(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            return item[fieldName];
        }

        /// <summary>
        ///     Gets the string value from the following field types: Single-Line Text, Multiline, Rich-Text. Returns empty string
        ///     if null or empty.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>String value of the field or empty string.</returns>
        public static string LoadText(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            return GetString(item, fieldName);
        }

        public static string LoadText(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadText(fieldName);
        }


        /// <summary>
        ///     Gets the int value of an Integer field. Returns value or null if field is empty.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Native nullable int type or null.</returns>
        public static int? LoadInteger(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            if (int.TryParse(GetString(item, fieldName), out var output))
                return output;

            return null;
        }

        public static int? LoadInteger(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadInteger(fieldName);
        }

        /// <summary>
        ///     Gets the DateTime value from the following field types: DateTime, Date. Converts from Sitecore's ISO date format.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Native DateTime type.</returns>
        public static DateTime LoadDateTime(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            DateField field = item.Fields[fieldName];

            if (field == null)
                return DateTime.MinValue;

            return DateUtil.IsoDateToDateTime(field.Value);
        }

        public static DateTime LoadDateTime(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadDateTime(fieldName);
        }

        /// <summary>
        ///     Gets a Sitecore ImageField object from an Image field.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Sitecore ImageField type.</returns>
        public static ImageField LoadImage(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            ImageField field = item.Fields[fieldName];

            return field;
        }

        public static ImageField LoadImage(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadImage(fieldName);
        }

        /// <summary>
        ///     Gets a Sitecore CheckboxField object from a checkbox field.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Sitecore CheckboxField type.</returns>
        public static CheckboxField LoadCheckbox(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            CheckboxField field = item.Fields[fieldName];

            return field;
        }

        public static CheckboxField LoadCheckbox(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;

            return string.IsNullOrEmpty(fieldName) ? null : item.LoadCheckbox(fieldName);
        }

        /// <summary>
        ///     Gets a LinkField object from the General Link field type.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>String value of the field or empty string.</returns>
        public static LinkField LoadGeneralLink(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            // TODO: handle null and return something?
            LinkField field = item.Fields[fieldName];

            return field;
        }

        public static LinkField LoadGeneralLink(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            return item.LoadGeneralLink(item.Database.GetItem(fieldId).Name);
        }

        /// <summary>
        ///     Gets a MultilistFIeld object from the following fields types: Multilist, Checklist, Multiroot Treelist, Treelist,
        ///     TreelistEx.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Multilist field type.</returns>
        public static MultilistField LoadMultilist(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            MultilistField field = item.Fields[fieldName];

            return field;
        }

        public static MultilistField LoadMultilist(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadMultilist(fieldName);
        }

        /// <summary>
        ///     Gets the string value stored in one of the following types: Droplist, Grouped Droplist.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>String value of the droplist field.</returns>
        public static string LoadDroplist(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            return GetString(item, fieldName);
        }


        /// <summary>
        ///     Gets the item stored/linked in one of the following types: Droplink, Grouped Droplink, DropTree.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Linked item.</returns>
        public static Item LoadDroplinkItem(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            ReferenceField output = item.Fields[fieldName];

            return output?.TargetItem;
        }


        public static Item LoadDroplinkItem(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadDroplinkItem(fieldName);
        }


        /// <summary>
        ///     Gets the key/value pair values from the following field types: Name Value List, Name Lookup Value List.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>NameValueListField field.</returns>
        public static NameValueListField LoadNameValueList(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            NameValueListField field = item.Fields[fieldName];

            return field;

            //string rawValue = item[fieldName];

            //if (String.IsNullOrEmpty(rawValue))
            //    return new NameValueCollection();

            //NameValueCollection output = Sitecore.Web.WebUtil.ParseUrlParameters(rawValue);
            //return output;
        }

        public static NameValueListField LoadNameValueList(this Item item, ID fieldId)
        {
            Assert.IsNotNullOrEmpty(fieldId.ToString(), "fieldId should not be null");

            item.Fields.ReadAll();
            var fieldName = item.Fields.FirstOrDefault(x => x.ID == fieldId)?.Name;
            return item.LoadNameValueList(fieldName);
        }

        /// <summary>
        ///     Gets the key/item pair values from the following field types: Name Value List, Name Lookup Value List.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Diectionary of key/item pairs.</returns>
        public static Dictionary<string, Item> LoadNameLookupValueListItems(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            // TODO: GET ITEMS

            var output = new Dictionary<string, Item>();
            var field = item.LoadNameValueList(fieldName);

            foreach (var key in field.NameValues.AllKeys)
            {
                var valueItem = item.Database.GetItem(new ID(HttpUtility.UrlDecode(field.NameValues[key])));

                if (valueItem != null)
                    output.Add(key, valueItem);
            }

            return output;

            /*

            string rawValue = item[fieldName];

            if (String.IsNullOrEmpty(rawValue))
                return null;

            NameValueCollection values = Sitecore.Web.WebUtil.ParseUrlParameters(rawValue);

            Dictionary<string, Item> output = new Dictionary<string, Item>();

            foreach (string key in values)
            {
                string itemID = values[key];

                Item valueItem = item.Database.GetItem(new ID(itemID));

                if (valueItem != null)
                    output.Add(key, valueItem);
            }

            return output;
            */
        }

        /// <summary>
        ///     Gets the key/item ID pairs from a Name Lookup Value List field.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Diectionary of key/item ID pairs.</returns>
        public static Dictionary<string, ID> LoadNameLookupValueListItemIDs(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            var rawValue = item[fieldName];

            if (string.IsNullOrEmpty(rawValue))
                return null;

            var values = WebUtil.ParseUrlParameters(rawValue);

            var output = new Dictionary<string, ID>();

            foreach (string key in values)
            {
                var itemID = values[key];

                var valueItem = item.Database.GetItem(new ID(itemID));

                if (valueItem != null)
                    output.Add(key, valueItem.ID);
            }

            return output;
        }

        /// <summary>
        ///     Gets a Sitecore FileField object from a FIle field.
        /// </summary>
        /// <param name="item">Source item.</param>
        /// <param name="fieldName">Name of the template field.</param>
        /// <returns>Sitecore FileField type.</returns>
        public static FileField LoadFile(this Item item, string fieldName)
        {
            Assert.IsNotNullOrEmpty(fieldName, "fieldName should not be null");

            FileField field = item.Fields[fieldName];

            return field;
        }
    }
}