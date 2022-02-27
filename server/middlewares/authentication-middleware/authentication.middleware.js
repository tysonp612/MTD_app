const admin = require("./../../firebase/index");

expors.authTokenCheck = (req, res, next) => {
  console.log(req.header);
  next();
};
