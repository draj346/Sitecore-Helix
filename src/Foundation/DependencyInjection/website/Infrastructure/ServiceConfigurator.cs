using Learning.Foundation.DependencyInjection.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace Learning.Foundation.DependencyInjection.Infrastructure
{
    public class ServiceConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddMvcControllers("Learning.Project.*");
            serviceCollection.AddMvcControllers("Learning.Feature.*");
            serviceCollection.AddMvcControllers("Learning.Foundation.*");

            serviceCollection.AddClassesWithServiceAttribute("Learning.Project.*");
            serviceCollection.AddClassesWithServiceAttribute("Learning.Feature.*");
            serviceCollection.AddClassesWithServiceAttribute("Learning.Foundation.*");
        }
    }
}