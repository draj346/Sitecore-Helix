using Learning.Foundation.Log.Integrations;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.DependencyInjection;

namespace Learning.Foundation.Log.Infrastructure
{
    public class ServiceConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<ILogEntryWriter, DefaultLogEntryWriter>();
            serviceCollection.AddSingleton<IIntegrationsLogEntryWriter, IntegrationsLogEntryWriter>();
        }
    }
}