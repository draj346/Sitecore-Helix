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
    public class MedicareGuideViewModel
    {
        public MedicareGuideViewModel(Item item)
        {
            ID = item.ID;

            Heading = item.LoadText(Templates.MedicareGuide.Fields.Heading);
            PlaceHolder = item.LoadText(Templates.MedicareGuide.Fields.CoverageTypePlaceHolder);
            GetStarted = item.LoadText(Templates.MedicareGuide.Fields.GetStarted);
            Description = item.LoadText(Templates.MedicareGuide.Fields.MedicareDescription);
            ValidationMessage = item.LoadText(Templates.MedicareGuide.Fields.ValidationMessage);

            List<Item> coverageTypes = item.LoadMultilist(Templates.MedicareGuide.Fields.CoverageType).GetItems().ToList();
            CoverageTypes = coverageTypes.Select(x => (CoverageViewModel)x).ToList();
        }

        public ID ID { get; set; }

        public string Heading { get; set; }
        public IEnumerable<CoverageViewModel> CoverageTypes { get; set; }
        public string PlaceHolder { get; set; }
        public string GetStarted { get; set; }
        public string Description { get; set; }
        public string ValidationMessage { get; set; }
    }
}