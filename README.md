# Firebase Slack Extension (Unofficial)

[**Install the extension using this link**](https://console.firebase.google.com/project/_/extensions/install?ref=nikkothari22/firebase-slack-extension)

**Author**: Nikhil Kothari (**[https://github.com/nikkothari22](https://github.com/nikkothari22)**)

**Description**: Functions to send messages to Slack channels using the Slack API. (Not an official extension)

**This is not an official Slack extension and the author is not associated with Slack or Firebase in any manner whatsoever. All trademarks and copyrights belong to the respective companies.**

**Details**: Use this extension to send messages to your customer's or your own Slack's channel. The extension uses the [Slack chat.postMessage API](https://api.slack.com/methods/chat.postMessage) to send the message.

You need to have a Slack app and get the authentication (Access) token from the user using the OAuth process (refer to the Slack API documentation for this). When you need to send a message to a specific channel of a user, use the Bot Token and channel name to send it to the user.

The extension has a cloud function that's triggered whenever a new document is created in the collection specified during installation.

Here's a basic example document write that would trigger this extension:

```js
admin.firestore().collection('slackMessages').add({
  authToken: 'xoxb-your-token-here',
  channel: 'general',
  message: {
    text: 'Hello world. This is a test message'
  },
})
```


#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing
To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 10+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))


**Cloud Functions:**

* **processMessage:** Runs when a document is created in the specified Cloud Firestore collection, delivers the Slack message, and updates the document with delivery status information.


**Access Required**:

This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added email documents.)


**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your customers. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

* Collection path: The path to the collection where documents will be created to send messages to users on Slack.
