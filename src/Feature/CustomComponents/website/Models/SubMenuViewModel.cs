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
    public class SubMenuViewModel
    {
        public static implicit operator SubMenuViewModel(Item item)
        {
            if (item == null) return null;

            List<Item> menuItemsList = item.LoadMultilist(Templates.SubMenu.Fields.ChildPage).GetItems().ToList();
            return new SubMenuViewModel
            {
                ID = item.ID,

                TabName = item.LoadText(Templates.SubMenu.Fields.TabName),
                MenuItems = menuItemsList.Select(x => (MenuItemViewModel)x).ToList()
            };
        }
        
        public ID ID { get; set; }

        public string TabName { get; set; }

        public IEnumerable<MenuItemViewModel> MenuItems { get; set; }
    }
}