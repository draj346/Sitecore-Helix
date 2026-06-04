using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Learning.Foundation.Utility.Extensions;
using Sitecore.Mvc.Presentation;

namespace Learning.Project.MHP.Models
{
    public class FooterViewRenderingModel : IRenderingModel
    {
        public void Initialize(Rendering rendering)
        {
            var item = rendering.Item;

            ID = item.ID;
            BackToTop = item.LoadText(Templates.Footer.Fields.BackToTop);
            Logo = item.LoadImage(Templates.Footer.Fields.Logo); // Logo = item.LoadImage(new ID("{EDF29AE9-335E-4028-839F-A0516CEEFE43}"));
            Title = item.LoadText(Templates.Footer.Fields.Title);
            TalkWithAgentLink = item.LoadGeneralLink(Templates.Footer.Fields.TalkWithAgentLink);
            PhoneNumberBlock = item.LoadText(Templates.Footer.Fields.PhoneNumberBlock);
            Copyright = item.LoadText(Templates.Footer.Fields.Copyright);
            Copyright = item.LoadText(Templates.Footer.Fields.PageNumber);
            SecurityTitle = item.LoadText(Templates.Footer.Fields.SecurityTitle);
            TermOfUseLink = item.LoadGeneralLink(Templates.Footer.Fields.TermOfUseLink);
            PrivacyPolicyLink = item.LoadGeneralLink(Templates.Footer.Fields.PrivacyPolicyLink);
            NotificationAndDisasterLink = item.LoadGeneralLink(Templates.Footer.Fields.NotificationAndDisasterLink);
            Disclaimer = item.LoadText(Templates.Footer.Fields.Disclaimer);
        }

        public ID ID { get; set; }

        public string BackToTop { get; set; }
        public ImageField Logo { get; set; }
        public string Title { get; set; }
        public LinkField TalkWithAgentLink { get; set; }
        public string PhoneNumberBlock { get; set; }
        public string Copyright { get; set; }
        public string PageNumber { get; set; }
        public string SecurityTitle { get; set; }
        public LinkField TermOfUseLink { get; set; }
        public LinkField PrivacyPolicyLink { get; set; }
        public LinkField NotificationAndDisasterLink { get; set; }
        public string Disclaimer { get; set; }
    }
}