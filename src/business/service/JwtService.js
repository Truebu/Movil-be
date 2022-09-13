import jwt from "jsonwebtoken";

module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== undefined) {
    try {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
    } catch (error) {
      return res.status(401).json({ msg: "No tiene permisos" });
    }

    return verify(req, res, next);
  } else {
    return res.status(401).json({ msg: "No tiene permisos" });
  }
};

const verify = (req, res, next) => {
  return jwt.verify(req.token, "JWT_SECRET", (error, authData) => {
    if (error) {
      return res.status(401).json({ msg: "No tiene permisos" });
    } else {
      req.authData = authData;
      return next();
    }
  });
};

module.exports.sign = (savedUser, res) => {
  jwt.sign(
    {
      name: savedUser.name,
      mail: savedUser.mail,
    },
    "JWT_SECRET",
    { expiresIn: "30m" },
    (err, token) => {
      return res.json({ token });
    }
  );
};