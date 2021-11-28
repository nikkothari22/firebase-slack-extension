import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const axios = require('axios').default;

import config from "./config";


exports.processMessage = functions.handler.firestore.document
    .onCreate((snap, context) => {
        const messageDocument = snap.data();

        const { authToken, channel, message } = messageDocument;

        let slackAPIData = {
            channel,
            ...message
        }

        const headers = {
            'Authorization': `Bearer ${authToken}`
        };



        axios.post('https://slack.com/api/chat.postMessage', slackAPIData, { headers })
            .then(function (response: any) {
                functions.logger.info("Message successfully sent")
                if (config.messageCollection) {
                    admin.firestore().collection(config.messageCollection).doc(snap.id).update({
                        updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                        response: response.data,
                        status: 'success'
                    });
                }

            })
            .catch(function (error: any) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    functions.logger.error(error.response.data);
                    if (config.messageCollection) {
                        admin.firestore().collection(config.messageCollection).doc(snap.id).update({
                            updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                            response: error.response.data,
                            status: 'error'
                        });
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    functions.logger.error(error.request);
                    if (config.messageCollection) {
                        admin.firestore().collection(config.messageCollection).doc(snap.id).update({
                            updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                            response: error.request,
                            status: 'error'
                        });
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    functions.logger.error('Error', error.message);
                    if (config.messageCollection) {
                        admin.firestore().collection(config.messageCollection).doc(snap.id).update({
                            updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                            response: error.message,
                            status: 'error'
                        });
                    }
                }
            });
    });
