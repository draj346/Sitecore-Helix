using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Learning.Foundation.Utility.Extensions;
using System.Collections.Generic;
using Learning.Feature.CustomComponents.Models;
using System.Linq;

namespace Learning.Project.MHP.Models
{
    public class HeaderViewModel
    {

        public HeaderViewModel(Item item)
        {
            ID = item.ID;

            BannerTitle = item.LoadText(Templates.Header.Fields.BannerTitle);
            UpdateMyLocation = item.LoadText(Templates.Header.Fields.UpdateMyLocation);
            HeaderImage = item.LoadImage(Templates.Header.Fields.HeaderImage);
            PhoneNumberBlock = item.LoadText(Templates.Header.Fields.PhoneNumberBlock);
            GetStarted = item.LoadGeneralLink(Templates.Header.Fields.GetStarted);
            Search = item.LoadGeneralLink(Templates.Header.Fields.Search);
            HoursOfOperation = item.LoadText(Templates.Header.Fields.HoursOfOperation);

            List<Item> menuGroups = item.LoadMultilist(Templates.Header.Fields.MenuGroups).GetItems().ToList();
            MenuGroups = menuGroups.Select(x=>(GroupMenuViewModel)x).ToList();
        }
        
        public ID ID { get; set; }

        public string BannerTitle { get; set; }
        public string UpdateMyLocation { get; set; }
        public ImageField HeaderImage { get; set; }
        public string PhoneNumberBlock { get; set; }
        public LinkField GetStarted { get; set; }
        public LinkField Search { get; set; }
        public string HoursOfOperation { get; set; }
        public IEnumerable<GroupMenuViewModel> MenuGroups { get; set; }

    }
}