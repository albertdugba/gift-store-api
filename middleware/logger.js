// @desc log the routes to the console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
};

module.exports = logger;
