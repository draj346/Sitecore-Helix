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
    public class BannerViewModel
    {
        public BannerViewModel(Item item)
        {
            ID = item.ID;

            Heading = item.LoadText(Templates.Banner.Fields.Heading); 
            SubHeading = item.LoadText(Templates.Banner.Fields.SubHeading);
            BannerImage = item.LoadImage(Templates.Banner.Fields.BannerImage);
            PlaceHolderKey = item.LoadText(Templates.Banner.Fields.PlaceHolderKey);
        }

        public ID ID { get; set; }

        public string Heading { get; set; }
        public string SubHeading { get; set; }
        public ImageField BannerImage { get; set; }
        public string PlaceHolderKey { get; set; }
    }
}