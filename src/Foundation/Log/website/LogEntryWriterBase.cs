using log4net;
using Sitecore.Diagnostics;
using System;
using System.Reflection;

namespace Learning.Foundation.Log
{
    public abstract class LogEntryWriterBase : ILogEntryWriter
    {
        private ILog _log;
        public virtual string LogName { get; }

        public LogEntryWriterBase(String logName = "")
        {
            LogName = logName;
        }

        public virtual ILog Log
        { 
            get 
            { 
                if (_log == null) _log = LoggerFactory.GetLogger(LogName);
                return _log; 
            }
            set => _log = value;
        }

        public virtual void WriteEntry(string message, MethodBase fromMethod = null, LogLevel level = LogLevel.Info)
        {
            if (fromMethod == null) fromMethod = MethodBase.GetCurrentMethod();

            var methodName = fromMethod.Name;

            WriteEntry(message, methodName, level);
        }

        public virtual void WriteEntry(string message, string methodName, LogLevel level = LogLevel.Info)
        {
            var prefix = $"{methodName}: ";
            var fullMessage = $"{prefix}{message}";

            switch (level) 
            { 
                case LogLevel.Info:
                    Log.Info(fullMessage);
                    break;
                case LogLevel.Debug: 
                    Log.Debug(fullMessage); 
                    break;
                case LogLevel.Warn:
                    Log.Warn(fullMessage);
                    break;
                case LogLevel.Error:
                    Log.Error(fullMessage);
                    break;
                case LogLevel.Fatal:
                    Log.Fatal(fullMessage);
                    break;
            }
        }
    }
}