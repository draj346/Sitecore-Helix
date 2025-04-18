using Newtonsoft.Json.Linq;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System.Collections.Generic;
using System.Linq;

namespace Learning.Foundation.RenderingContents
{
    public class ItemAndMultilistResolver : RenderingContentsResolver
    {
        public override object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            // Check if the rendering and renderingConfig parameters are not null
            Assert.ArgumentNotNull(rendering, nameof(rendering));
            Assert.ArgumentNotNull(renderingConfig, nameof(renderingConfig));

            // Get the datasource item for the current rendering
            Item datasourceItem = GetContextItem(rendering, renderingConfig);

            // Return null if the datasource item is null
            if (datasourceItem == null)
            {
                return null;
            }

            // Initialize the JSON object to be returned with details from the datasource item
            JObject jobject = ProcessItem(datasourceItem, rendering, renderingConfig);

            // Process Multiroot Treelist fields in the datasource item
            ProcessMultirootTreelistFields(datasourceItem, jobject, rendering, renderingConfig);

            // Return the final JSON object
            return jobject;
        }

        private void ProcessMultirootTreelistFields(Item item, JObject jobject, Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            // Find all fields of type "Multiroot Treelist" in the item
            var multilistFields = item.Fields.ToList().FindAll(data => data.Type == "Multiroot Treelist");

            // Iterate through each Multiroot Treelist field
            foreach (var field in multilistFields)
            {
                // Initialize a list to hold items referenced in the Multiroot Treelist field
                List<Item> multiItems = new List<Item>();

                // Check if the field has a non-empty value
                if (!string.IsNullOrWhiteSpace(field.Value))
                {
                    // Split the field value by '|' to get individual item IDs
                    List<string> itemIds = field.Value.Split('|').ToList();

                    // Iterate through each item ID
                    foreach (var id in itemIds)
                    {
                        // Get the item from the Sitecore database using the ID
                        var multiItem = Sitecore.Context.Database.GetItem(new ID(id));

                        // If the item exists, add it to the multiItems list
                        if (multiItem != null)
                        {
                            multiItems.Add(multiItem);
                        }
                    }

                    // Check if any valid items were found
                    if (multiItems.Count != 0)
                    {
                        // Initialize a JSON array to hold the processed items
                        JArray multiItemsArray = new JArray();

                        // Iterate through each item in the multiItems list
                        foreach (var multiItem in multiItems)
                        {
                            // Process the item to create a JSON object
                            JObject multiItemObject = ProcessItem(multiItem, rendering, renderingConfig);

                            // Add the Item ID to the JSON object
                            multiItemObject["id"] = multiItem.ID.ToString();

                            // Recursively process Multiroot Treelist fields in the current item
                            ProcessMultirootTreelistFields(multiItem, multiItemObject, rendering, renderingConfig);

                            // Add the processed JSON object to the array
                            multiItemsArray.Add(multiItemObject);
                        }

                        // Add the JSON array to the main JSON object under the field name
                        jobject[field.Name] = multiItemsArray;
                    }
                    else
                    {
                        // If no valid items are found, assign an empty array to the field
                        jobject[field.Name] = new JArray();
                    }
                }
                else
                {
                    // If the field value is empty, assign an empty array to the field
                    jobject[field.Name] = new JArray();
                }
            }
        }
    }
}