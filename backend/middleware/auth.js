const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    return res
      .status(401)
      .send({ errors: "please authenticate using a valid token" });
  }
};
