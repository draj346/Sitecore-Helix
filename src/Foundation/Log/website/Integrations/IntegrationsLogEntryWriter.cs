namespace Learning.Foundation.Log.Integrations
{
    public class IntegrationsLogEntryWriter : LogEntryWriterBase, IIntegrationsLogEntryWriter
    {
        private const string customLogName = "LearningIntegrationLogger";

        public IntegrationsLogEntryWriter() : base(customLogName)
        {
        }
    }
}