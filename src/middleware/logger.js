module.exports = (req, res, next) => {
  // Log the request method and URL
  console.log(`${req.method} ${req.url}`);
  // Log request headers
  console.log("Headers:");
  console.log(req.headers);

  // Log request body (if any)
  if (req.body) {
    console.log("Body:");
    console.log(req.body);
  }

  next();
};
