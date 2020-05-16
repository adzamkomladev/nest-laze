export default () => ({
  port: parseInt(process.env.APP_PORT, 10),
  version: process.env.APP_VERSION,
});
