using Learning.Feature.CustomComponents.Models;
using Learning.Foundation.Log.Integrations;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learning.Feature.CustomComponents.Controllers
{
    public class ContactsController : Controller
    {
        public readonly IIntegrationsLogEntryWriter _integrationsLogEntryWriter;

        public ContactsController(IIntegrationsLogEntryWriter integrationsLogEntryWriter)
        {
            _integrationsLogEntryWriter = integrationsLogEntryWriter;
        }

        // GET: Navigation
        public ActionResult Contact()
        {
            const string methodName = nameof(Contact);
            var started = DateTime.Now;

            #region Footer Log
            _integrationsLogEntryWriter.WriteEntry("Contact Action is getting called", methodName, Foundation.Log.LogLevel.Info);
            _integrationsLogEntryWriter.WriteEntry($"begin at: {started}", methodName, Foundation.Log.LogLevel.Info);
            #endregion

            try
            {
                var item = RenderingContext.CurrentOrNull.Rendering.Item;
                var model = new ContactViewModel(item);

                if (model != null)
                    return View(model);
            }
            catch (Exception ex)
            {
                _integrationsLogEntryWriter.WriteEntry("Failure while calling Contact Action", methodName, Foundation.Log.LogLevel.Error);
                _integrationsLogEntryWriter.WriteEntry(ex.ToString(), methodName, Foundation.Log.LogLevel.Error);
            }
            finally
            {
                _integrationsLogEntryWriter.WriteEntry($"Leaving Footer Action Done at: {DateTime.Now}", methodName, Foundation.Log.LogLevel.Info);
            }

            return null;
        }
    }
}