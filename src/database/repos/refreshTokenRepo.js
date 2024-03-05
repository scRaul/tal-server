const RefreshToken = require("../models/refreshTokens");
const jwt = require("jsonwebtoken");

async function create(userId) {
  try {
    const refToken = await generateRreshToken(userId);
    const authToken = generateAuthToken(userId);
    const token = refToken.token;
    const expires = refToken.expires;
    const rec = await RefreshToken.create({ token, userId, expires });
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

async function generateRreshToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // date 7 days from now
  try {
    const data = { token, userId, expiresIn: expires };
    const entry = await RefreshToken.create(data);
    return { token, expires };
  } catch (err) {
    throw err;
  }
}
module.exports = {
  create,
  removeToken,
  removeUser,
  generateAuthToken,
  verify,
};
