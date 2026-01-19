
// monitoring-setup.js
const winston = require('winston');

// Create security-focused logger
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'security-service' },
  transports: [
    new winston.transports.File({ 
      filename: 'security.log',
      level: 'warn'
    }),
    new winston.transports.Console()
  ]
});

// Log security events
function logSecurityEvent(event) {
  securityLogger.warn({
    timestamp: new Date(),
    type: event.type,
    user: event.user,
    action: event.action,
    ip: event.ip,
    details: event.details
  });
}
