export default () => ({
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  url: process.env.APP_URL || "http://localhost:5000"
});
