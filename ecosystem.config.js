/*
module.exports = {
  apps: [
    {
      name: "botcandelaria",
      script: "npm",
      args: "start",
      watch: false, // Desactiva el watch si no quieres reinicios por cambios en el código
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      cron_restart: "0 */ /*12 * * *", // Reinicia el bot cada 12 horas
      autorestart: true, // Reinicia automáticamente si se detiene por error
      max_restarts: 5, // Intenta reiniciar hasta 5 veces en caso de fallo
      restart_delay: 5000, // Espera 5 segundos antes de intentar reiniciar después de un fallo
    },
  ],
};
*/

module.exports = {
  apps: [
    {
      name: "botcandelaria",
      script: "app.js", // Archivo principal de tu bot
      cron_restart: "0 0 * * *", // Reinicio cada 12 horas */5 * * * *  ; 0 */12 * * * ; "cron_restart": "0 0 * * *"
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
