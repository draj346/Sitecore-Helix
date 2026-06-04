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
    public class ContactViewModel
    {
        public ContactViewModel() { }

        public ContactViewModel(Item item)
        {
            ID = item.ID;

            Heading = item.LoadText(Templates.Contact.Fields.Heading); 
            SubHeading = item.LoadText(Templates.Contact.Fields.SubHeading);
            CallToAction = item.LoadText(Templates.Contact.Fields.CallToAction);
            CallToActionImage = item.LoadImage(Templates.Contact.Fields.CallToActionImage);
            PhoneNumberBlock = item.LoadText(Templates.Contact.Fields.PhoneNumberBlock);
            HoursOperation = item.LoadText(Templates.Contact.Fields.HoursOfOperation);
            CallRequest = item.LoadText(Templates.Contact.Fields.CallRequest);
            CallRequestImage = item.LoadImage(Templates.Contact.Fields.CallRequestImage);
            CallRequestLink = item.LoadGeneralLink(Templates.Contact.Fields.CallRequestLink);
            ContactInformation = item.LoadText(Templates.Contact.Fields.ContactInformation);
        }

        public ID ID { get; set; }

        public string Heading { get; set; }
        public string SubHeading { get; set; }
        public string CallToAction { get; set; }
        public ImageField CallToActionImage { get; set; }
        public string PhoneNumberBlock { get; set; }
        public string HoursOperation { get; set; }
        public string CallRequest { get; set; }
        public ImageField CallRequestImage { get; set; }
        public LinkField CallRequestLink { get; set; }
        public string ContactInformation { get; set; }

    }
}