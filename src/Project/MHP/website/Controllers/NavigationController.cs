using Learning.Foundation.Log.Integrations;
using Learning.Project.MHP.Models;
using Sitecore.Mvc.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learning.Project.MHP.Controllers
{
    public class NavigationController : Controller
    {
        public readonly IIntegrationsLogEntryWriter _integrationsLogEntryWriter;

        public NavigationController(IIntegrationsLogEntryWriter integrationsLogEntryWriter)
        {
            _integrationsLogEntryWriter = integrationsLogEntryWriter;
        }

        // GET: Navigation
        public ActionResult Footer()
        {
            const string methodName = nameof(Footer);
            var started = DateTime.Now;

            #region Footer Log
            _integrationsLogEntryWriter.WriteEntry("Footer Action is getting called", methodName, Foundation.Log.LogLevel.Debug);
            _integrationsLogEntryWriter.WriteEntry($"begin at: {started}", methodName, Foundation.Log.LogLevel.Debug);
            #endregion

            try
            {
                var item = RenderingContext.CurrentOrNull.Rendering.Item;
                var model = new FooterViewModel(item);

                if (model != null)
                    return View(model);
            }
            catch(Exception ex)
            {
                _integrationsLogEntryWriter.WriteEntry("Failure while calling Footer Action", methodName, Foundation.Log.LogLevel.Error);
                _integrationsLogEntryWriter.WriteEntry(ex.ToString(), methodName, Foundation.Log.LogLevel.Error);
            }
            finally
            {
                _integrationsLogEntryWriter.WriteEntry($"Leaving Footer Action Done at: {DateTime.Now}", methodName, Foundation.Log.LogLevel.Debug);
            }

            return null;
        }

        public ActionResult Header()
        {
            const string methodName = nameof(Header);
            var started = DateTime.Now;

            #region Header Log
            _integrationsLogEntryWriter.WriteEntry("Header Action is getting called", methodName, Foundation.Log.LogLevel.Debug);
            _integrationsLogEntryWriter.WriteEntry($"begin at: {started}", methodName, Foundation.Log.LogLevel.Debug);
            #endregion

            try
            {
                var item = RenderingContext.CurrentOrNull.Rendering.Item;
                var model = new HeaderViewModel(item);

                if (model != null)
                    return View(model);
            }
            catch (Exception ex)
            {
                _integrationsLogEntryWriter.WriteEntry("Failure while calling Header Action", methodName, Foundation.Log.LogLevel.Error);
                _integrationsLogEntryWriter.WriteEntry(ex.ToString(), methodName, Foundation.Log.LogLevel.Error);
            }
            finally
            {
                _integrationsLogEntryWriter.WriteEntry($"Leaving Footer Action Done at: {DateTime.Now}", methodName, Foundation.Log.LogLevel.Debug);
            }

            return null;
        }
    }
}