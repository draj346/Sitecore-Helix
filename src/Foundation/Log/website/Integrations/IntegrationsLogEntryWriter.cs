namespace Learning.Foundation.Log.Integrations
{
    public class IntegrationsLogEntryWriter : LogEntryWriterBase, IIntegrationsLogEntryWriter
    {
        private const string customLogName = "LearningIntegrationsLogger";

        public IntegrationsLogEntryWriter() : base(customLogName)
        {
        }
    }
}