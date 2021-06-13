const functions = require("firebase-functions");
const { formatter } = require("@digibear/mush-format");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(async (request, response) => {
  let results;

  if (request.query.include) {
    const { data } = await formatter.format(
      "#include " + request.query.include
    );
    results = data;
  } else if (request.query.text) {
    const { data } = await formatter.format(request.query.include);
    results = data;
  } else {
    results = "Unknown query parameter.";
  }
  response.set("Content-Type", "text/plain");
  response
    .status(200)
    .send(
      results +
        "\n\n@@ Compressed with MUSH-Format\n@@ https://github.com/digibear-io/mush-format"
    );
});
