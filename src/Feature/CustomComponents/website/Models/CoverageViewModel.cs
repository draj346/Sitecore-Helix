using Learning.Foundation.Utility.Extensions;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Learning.Feature.CustomComponents.Models
{
    public class CoverageViewModel
    {
        public static implicit operator CoverageViewModel(Item item)
        {
            if (item == null) return null;

            return new CoverageViewModel
            {
                ID = item.ID,

                Name = item.LoadText(Templates.Coverage.Fields.Name),
                Value = item.LoadText(Templates.Coverage.Fields.Value),
                RedirectLink = item.LoadGeneralLink(Templates.Coverage.Fields.RedirectLink)
            };
        }

        public ID ID { get; set; }

        public string Name { get; set; }
        public string Value { get; set; }
        public LinkField RedirectLink { get; set; }
    }
}