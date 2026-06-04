using Sitecore.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Learning.Project.MHP
{
    public static class Templates
    {
        public readonly struct Footer
        {
            public static readonly ID ID = new ID("{161A2A8A-0913-4243-9408-C5F555A0F25A}");

            public readonly struct Fields
            {
                public static readonly ID BackToTop = new ID("{03467701-B59D-46C1-80AB-7D8108FCB891}");
                public static readonly ID Logo = new ID("{EDF29AE9-335E-4028-839F-A0516CEEFE43}");
                public static readonly ID Title = new ID("{EF4121AC-1E52-4E34-8BA7-ADACB9093F64}");
                public static readonly ID TalkWithAgentLink = new ID("{89C2E0B1-23D6-4B04-8B32-DF3F7559A582}");
                public static readonly ID PhoneNumberBlock = new ID("{268998D4-B935-4C51-9856-E4C3871F2D00}");
                public static readonly ID Copyright = new ID("{AF31FE14-048F-4392-8BC8-6466448328DF}");
                public static readonly ID PageNumber = new ID("{8878C95F-5801-4954-A3B2-2B5041C02152}");
                public static readonly ID SecurityTitle = new ID("{223A01ED-5FC7-46F2-8AF1-45BDEFC080B7}");
                public static readonly ID TermOfUseLink = new ID("{59D45B94-DBCF-431E-B229-6812A0D49861}");
                public static readonly ID PrivacyPolicyLink = new ID("{03CE0B38-D44A-4B61-BDC6-D6422A493CA8}");
                public static readonly ID NotificationAndDisasterLink = new ID("{CDFB1441-9946-43E0-A6E4-453ADB248289}");
                public static readonly ID Disclaimer = new ID("{7DE8D7B5-FFA8-442E-8D51-E0DC01BC473E}");
            }
        }

        public readonly struct Header
        {
            public static readonly ID ID = new ID("{851CDC9C-1384-403F-918D-E44E998C129F}");

            public readonly struct Fields
            {
                public static readonly ID BannerTitle = new ID("{DB2F7CBF-066D-4026-8D32-C0E2D2358B16}");
                public static readonly ID UpdateMyLocation = new ID("{A5D0528F-D59F-4156-9A6E-3D67357B318D}");
                public static readonly ID HeaderImage = new ID("{9DA85D1D-DD8F-4D8C-BE67-AB41DCF8B873}");
                public static readonly ID PhoneNumberBlock = new ID("{DB5E4E7D-ADA5-4BE5-8E17-6513AC0256A4}");
                public static readonly ID GetStarted = new ID("{1AB770A7-A74B-4056-AB88-C6BA51C7E2E1}");
                public static readonly ID Search = new ID("{AAE4AA63-1296-4E0B-B81A-4F2E4D931ABB}");
                public static readonly ID HoursOfOperation = new ID("{68A78017-DC11-4607-8D55-324550F81EE7}");
                public static readonly ID MenuGroups = new ID("{53E56BA0-70C2-4433-B88A-13B1DEAAAEF0}");
            }
        }
    }
}