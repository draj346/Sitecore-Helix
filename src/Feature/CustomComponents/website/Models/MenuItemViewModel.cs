using Learning.Foundation.Utility.Extensions;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Links;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Learning.Feature.CustomComponents.Models
{
    public class MenuItemViewModel
    {
        public static implicit operator MenuItemViewModel(Item item)
        {
            if (item == null) return null;

            return new MenuItemViewModel
            {
                ID = item.ID,

                PageName = item.Name,
                PageUrl = LinkManager.GetItemUrl(item)
            };
        }
        public ID ID { get; set; }

        public string PageName { get; set; }
        public string PageUrl { get; set; }
    }
}