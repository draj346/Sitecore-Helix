using Sitecore.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Learning.Feature.CustomComponents
{
    public static class Templates
    {
        public readonly struct Contact
        {
            public static readonly ID ID = new ID("{C8554C74-81CA-40DC-936C-F77E5F6F9EDC}");

            public readonly struct Fields
            {
                public static readonly ID Heading = new ID("{3CBAC068-7325-495A-BB58-B580DD874C05}");
                public static readonly ID SubHeading = new ID("{331A10D9-2255-4EFA-8008-FADC0CDCDD2C}");
                public static readonly ID CallToAction = new ID("{3B79E22A-C5FC-4393-A35D-526D219E085C}");
                public static readonly ID CallToActionImage = new ID("{925DE6CE-FCB6-4947-8BAC-99F36EDA705D}");
                public static readonly ID PhoneNumberBlock = new ID("{A5AC58AD-37B1-492C-917C-1EA872DD3CC9}");
                public static readonly ID HoursOfOperation = new ID("{038EE259-BF75-4FCA-A493-9759269F8601}");
                public static readonly ID CallRequest = new ID("{8CF3DF86-1E0C-4A7B-8548-11E7C1212978}");
                public static readonly ID CallRequestImage = new ID("{7816859B-DF05-4D3D-B887-5D05668ACFFF}");
                public static readonly ID CallRequestLink = new ID("{58BA8C58-F6E4-4C2C-B555-86AAF080274D}");
                public static readonly ID ContactInformation = new ID("{8CB37A19-8520-47A5-BFF1-01FDE9A3B2D7}");
            }
        }

        public readonly struct SubMenu
        {
            public static readonly ID ID = new ID("{409E72CF-DF56-4B1B-AF4A-00BD23630DDD}");

            public readonly struct Fields
            {
                public static readonly ID TabName = new ID("{FCCC9B72-CDE2-4B52-B0EF-C0613A3A9C29}");
                public static readonly ID ChildPage = new ID("{79DE2BD4-8BC3-4F98-8907-4F6B7F8F1F29}");
            }
        }

        public readonly struct GroupMenu
        {
            public static readonly ID ID = new ID("{75A9A94C-28CF-44BE-B7D2-1E8F0ECB4EF9}");

            public readonly struct Fields
            {
                public static readonly ID TabName = new ID("{BF89CA4D-385C-4971-B4FB-85B0A1FBC827}");
                public static readonly ID GroupSubMenu = new ID("{ECECDD4B-13E9-4BB3-B005-FE7A26204EE2}");
            }
        }

        public readonly struct Banner
        {
            public static readonly ID ID = new ID("{6D6FA888-5584-49CB-A4CA-FD831C6F48B3}");

            public readonly struct Fields
            {
                public static readonly ID Heading = new ID("{7347BD12-C612-4438-BF16-A029D9EC6532}");
                public static readonly ID SubHeading = new ID("{67C1CDE6-E5E1-4A4E-80AC-4479F9FC1784}");
                public static readonly ID BannerImage = new ID("{DA938BF1-096C-4623-A29A-AADAB6215F7D}");
                public static readonly ID PlaceHolderKey = new ID("{E2ACE9C5-A0ED-4C9D-BF07-75960CD9D291}");
            }
        }

        public readonly struct Coverage
        {
            public static readonly ID ID = new ID("{0CD5B218-FBA2-431C-BDF1-729319752D6D}");

            public readonly struct Fields
            {
                public static readonly ID Name = new ID("{C256B857-894E-44FA-8C65-FB5958F493BD}");
                public static readonly ID Value = new ID("{0161F328-A62A-43A3-BA0D-800A4CFF77C2}");
                public static readonly ID RedirectLink = new ID("{A7ACA93B-AB91-4DDB-932F-6BF26BCAA645}");
            }
        }

        public readonly struct MedicareGuide
        {
            public static readonly ID ID = new ID("{960DEFFD-B444-4E12-9677-2275FFF12F5F}");

            public readonly struct Fields
            {
                public static readonly ID Heading = new ID("{3D1E64D5-9B5B-45B9-B7E1-915D98526E9B}");
                public static readonly ID CoverageType = new ID("{4A385153-E6DE-496D-B3BE-A7FF451ED7F3}");
                public static readonly ID CoverageTypePlaceHolder = new ID("{18849F4F-3750-44FD-84D8-781B32560D0B}");
                public static readonly ID GetStarted = new ID("{07AE6ECD-B566-49CD-A0ED-A37ABB1B9FE8}");
                public static readonly ID MedicareDescription = new ID("{5E8928FB-084C-4D60-9A78-7D6D6B49A9CA}");
                public static readonly ID ValidationMessage = new ID("{351160D7-1DF8-4281-955A-B335A5C94849}");
            }
        }
    }
}