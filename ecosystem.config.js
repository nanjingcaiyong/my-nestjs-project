module.exports = {
  apps: [
    {
      name: 'app1',
      script: 'dist/main.js',
      env_sit: {
        NODE_ENV: 'production',
        SERVER_PORT: 3000,
        API_ENV: 'sit',
      },
      env_pre: {
        NODE_ENV: 'production',
        SERVER_PORT: 3000,
        API_ENV: 'pre',
      },
      env_prod: {
        NODE_ENV: 'production',
        SERVER_PORT: 3000,
        API_ENV: 'prod',
      },
    },
  ],
};
