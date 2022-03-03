const admin = require("../../firebase/index");

exports.authTokenCheck = async (req, res, next) => {
  try {
    // const firebaseUser = await getAuth().verifyIdToken(req.headers);
    const verifyToken = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(401).json({ err: "Invalid or expired token" });
  }
};
