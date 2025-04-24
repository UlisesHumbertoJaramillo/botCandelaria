module.exports = {
  apps: [
    {
      name: "botcandelaria",
      script: "./dist/app.js", // ¡Asegúrate de que esta ruta existe!
      cron_restart: "0 7,19 * * *",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};