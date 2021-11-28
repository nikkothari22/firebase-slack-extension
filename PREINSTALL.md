Use this extension to send messages to Slack channels that contain the information from documents added to a specified Cloud Firestore collection.

Adding a document triggers this extension to send a message using the data in document's fields. The extension makes a HTTP POST request to Slack's [chat.postMessage](https://api.slack.com/methods/chat.postMessage) API.

To get started, create your Slack app [here](https://api.slack.com/apps). You can then install the app on your own workspace or choose to distribute it.

The document's top-level fields include:
- `authToken` : The Authorization Token bearing required scopes used to authenticate the request sent to Slack. This is usually the "Bot Token". You can refer to the documentation [here](https://api.slack.com/authentication/token-types). If your Slack app is installed on multiple Workspaces, you would need the Bot token with the `chat:write` and `chat:write.public` scope to send messages to any channel in the user's workspace.
- `channel` : Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.
- `message` : An object/map with the contents of the message to be sent. For a simple text message, the `message` object will contain a string field named `text`. To know more about the different message content options, please visit the [Slack API documentation](https://api.slack.com/methods/chat.postMessage).

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

Note that this extension can be used only if you have a Slack app.

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing
To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 12+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))