const functions = require("firebase-functions");
const { formatter } = require("@digibear/mush-format");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(async (request, response) => {
  const results = await formatter.format("#include " + request.query.include);
  response.set("Content-Type", "text/plain");
  response
    .status(200)
    .send(
      results +
        "\n\n@@ Created with MUSH-Formatter\n@@ https://github.com/digibear-io/mush-format"
    );
});
