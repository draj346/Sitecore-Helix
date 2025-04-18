using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System.Collections.Generic;
using System.Linq;

namespace Learning.Foundation.RenderingContents
{
    public class ItemAndChildrenResolver : RenderingContentsResolver
    {
        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull(rendering, nameof(rendering));
            Assert.ArgumentNotNull(renderingConfig, nameof(renderingConfig));
            Item contextItem = GetContextItem(rendering, renderingConfig);

            if (contextItem == null)
                return null;

            JObject jobject = ProcessItem(contextItem, rendering, renderingConfig);

            // Overwrite the Item selector query to get children
            ItemSelectorQuery = "./*";
            IEnumerable<Item> items = GetItems(contextItem);
            List<Item> objList = items?.ToList();

            if (objList == null || objList.Count == 0)
                return jobject;

            // Process children recursively
            jobject["Children"] = ProcessItemsRecursively(objList, rendering, renderingConfig);

            return jobject;
        }

        private JArray ProcessItemsRecursively(List<Item> items, Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            JArray array = new JArray();
            foreach (var item in items)
            {
                JObject itemJObject = ProcessItem(item, rendering, renderingConfig);

                // Get children of the current item
                ItemSelectorQuery = "./*";
                IEnumerable<Item> childItems = GetItems(item);
                List<Item> childList = childItems?.ToList();

                if (childList != null && childList.Count > 0)
                {
                    // Recursive call to process grandchildren and beyond
                    itemJObject["Children"] = ProcessItemsRecursively(childList, rendering, renderingConfig);
                }

                array.Add(itemJObject);
            }
            return array;
        }
    }
}