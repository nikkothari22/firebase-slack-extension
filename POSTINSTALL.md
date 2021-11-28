### See it in action

You can test out this extension right away!

1.  Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.

1.  If it doesn't already exist, create the collection you specified during installation: `${param:SLACK_MESSAGE_COLLECTION}`.

1.  Add a document with a `authToken` field, `channel` field and a `message` field with the following content:

    ```js
    authToken: 'xoxb-your-token-here',
    message: {
      text: 'Hello from Firebase'
    },
    channel: 'general'
    ```

1.  In a few seconds, you'll see a `response` field appear in the document. The field will update after the extension gets the response from the Slack API. It contain the response from the Slack API. Additionally, a field `status` will also be created with the values `success` or `error`.

**Note:** You should use the [Firebase Admin SDK][admin_sdk] to add a document since you need to specify Auth tokens in the document:

```js
admin
  .firestore()
  .collection("${param:SLACK_MESSAGE_COLLECTION}")
  .add({
    authToken: 'xoxb-your-token-here',
    message: {
      text: 'Hello from Firebase'
    },
    channel: 'general'
  })
  .then(() => console.log("Queued Slack message for delivery!"));
```

### Using this extension

After its installation, this extension monitors all document created in the `${param:SLACK_MESSAGE_COLLECTION}` collection. Slack messages are delivered based on the contents of the document's fields. The top-level fields specify the auth token and channel name. The `message` field contains the details of the message to deliver.

#### Message field

The `message` field of the document contains the content for the Slack message. This field should generally only be populated by trusted code running in your own servers or Cloud Functions (refer to the "Security rules and sending email" section below).

Available properties for the `message` field are specified in the [Slack API documentation](https://api.slack.com/methods/chat.postMessage).


#### Security rules and sending Slack messages

This extension can be used to trigger Slack message delivery directly from client applications. However, you should carefully control client access to the `${param:SLACK_MESSAGE_COLLECTION}` collection to avoid potential abuse (you don't want users able to send arbitrary message using your company's Slack app!).


### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.

[admin_sdk]: https://firebase.google.com/docs/admin/setup