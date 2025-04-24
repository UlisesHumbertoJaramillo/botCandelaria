import {createLogger, transports, format} from "winston";

export const logger = createLogger({
  level: "info", // Nivel de log: puede ser 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Muestra los logs en consola
    new transports.File({ filename: "app.log" }), // Guarda los logs en un archivo
  ],
});
