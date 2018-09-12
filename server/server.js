const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

const PUBLIC_VAPID = 'BGtAuHTsb1--TkunwxQZDd2JII6baiJEg9mr8WsHK_qCsl-h7p4KSGSjcCTBzdox0lCXFfVKtDakgMrJUYNfRTk';
const PRIVATE_VAPID = 'dZGBPeZWRJrm6tg9An4D_EQmCza1rNBi9dOSEg4fj0o';

const app = express();

const fakeDatabase = [];

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

app.post('/subscription', (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription);
});

app.post('/sendNotification', (req, res) => {
  console.log('Hello');
  const notificationPayload = {
    notification: {
      title: 'Valar Morghulis',
      body: 'I am No One',
      icon: 'assets/icons/icon-512x512.png'
    }
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
