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
    public class GroupMenuViewModel
    {
        public static implicit operator GroupMenuViewModel(Item item)
        {
            if (item == null) return null;

            List<Item> menuItemsList = item.LoadMultilist(Templates.GroupMenu.Fields.GroupSubMenu).GetItems().ToList();
            return new GroupMenuViewModel
            {
                ID = item.ID,

                TabName = item.LoadText(Templates.GroupMenu.Fields.TabName),
                GroupMenuItems = menuItemsList.Select(x => (SubMenuViewModel)x).ToList()
            };
        }
        public ID ID { get; set; }

        public string TabName { get; set; }

        public IEnumerable<SubMenuViewModel> GroupMenuItems { get; set; }
    }
}