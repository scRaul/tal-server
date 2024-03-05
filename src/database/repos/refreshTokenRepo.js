const RefreshToken = require("../models/refreshTokens");
const jwt = require("jsonwebtoken");

async function create(userId) {
  try {
    const refToken = await generateRreshToken(userId);
    const authToken = generateAuthToken(userId);
    const token = refToken.token;
    const expiresIn = refToken.expires;
    const rec = await RefreshToken.create({ token, userId, expiresIn });
    return { refToken, authToken };
  } catch (err) {
    throw err;
  }
}

async function verify(token) {
  try {
    const rec = await RefreshToken.findOne({ where: { token } });

    if (!rec) {
      return false;
    }
    if (rec.expiresIn < Date.now()) {
      rec.destroy();
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function removeToken(token) {
  try {
    await RefreshToken.destroy({ where: { token } });
    return true;
  } catch (err) {
    throw err;
  }
}
async function removeUser(userId) {
  try {
    await RefreshToken.destroy({ where: { userId } });
    return true;
  } catch (err) {
    throw err;
  }
}

function generateAuthToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); //date 2 hours from now
  return { token, expires };
}

function generateRreshToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // date 7 days from now
  return { token, expires };
}
module.exports = {
  create,
  removeToken,
  removeUser,
  generateAuthToken,
  verify,
};
