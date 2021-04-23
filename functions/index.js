const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { NodeVM } = require("vm2");
const cors = require("cors")({ origin: true });
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.run = functions.https.onRequest((req, res) => {
  try {
    cors(req, res, () => {
      const vm = new NodeVM({
        timeout: 1000,
        console: "redirect",
      });

      const logs = [];
      vm.on("console.log", (data) => logs.push({ type: "info", data }));
      vm.on("console.error", (data) => logs.push({ type: "error", data }));

      const { body } = req.body;
      vm.run(body.code);

      res.status(200).json({ logs });
    });
  } catch (error) {
    res
      .status(500)
      .json({ logs: [{ type: "servererror", data: error.message }] });
  }
});
