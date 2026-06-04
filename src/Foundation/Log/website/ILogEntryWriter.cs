using log4net;
using System.Reflection;

namespace Learning.Foundation.Log
{
    public interface ILogEntryWriter
    {
        string LogName { get; }

        ILog Log { get; }

        void WriteEntry(string message, MethodBase fromMethod = null, LogLevel level = LogLevel.Info);
        void WriteEntry(string message, string methodName, LogLevel level = LogLevel.Info);
    }
}