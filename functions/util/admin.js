var admin = require("firebase-admin");
var serviceAccount = require("../saplify-48591-87f9ad72d7c4.json");

admin.initializeApp();

module.exports = { admin };
