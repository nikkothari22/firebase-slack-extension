"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require('axios').default;
const config_1 = require("./config");
exports.processMessage = functions.handler.firestore.document
    .onCreate((snap, context) => {
    const messageDocument = snap.data();
    const { authToken, channel, message } = messageDocument;
    let slackAPIData = Object.assign({ channel }, message);
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    axios.post('https://slack.com/api/chat.postMessage', slackAPIData, { headers })
        .then(function (response) {
        functions.logger.info("Message successfully sent");
        if (config_1.default.messageCollection) {
            admin.firestore().collection(config_1.default.messageCollection).doc(snap.id).update({
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                response: response.data,
                status: 'success'
            });
        }
    })
        .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            functions.logger.error(error.response.data);
            if (config_1.default.messageCollection) {
                admin.firestore().collection(config_1.default.messageCollection).doc(snap.id).update({
                    updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                    response: error.response.data,
                    status: 'error'
                });
            }
        }
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            functions.logger.error(error.request);
            if (config_1.default.messageCollection) {
                admin.firestore().collection(config_1.default.messageCollection).doc(snap.id).update({
                    updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                    response: error.request,
                    status: 'error'
                });
            }
        }
        else {
            // Something happened in setting up the request that triggered an Error
            functions.logger.error('Error', error.message);
            if (config_1.default.messageCollection) {
                admin.firestore().collection(config_1.default.messageCollection).doc(snap.id).update({
                    updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                    response: error.message,
                    status: 'error'
                });
            }
        }
    });
});
//# sourceMappingURL=index.js.map