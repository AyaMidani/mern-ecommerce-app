const Iyzipay = require("iyzipay");

const iyzico = new Iyzipay({
  apiKey: process.env.IYZI_API_KEY,
  secretKey: process.env.IYZI_SECRET,
  uri: process.env.IYZI_API_URI
});

module.exports = iyzico;