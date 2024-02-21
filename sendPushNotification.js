//import { NextRequest, NextResponse } from 'next/server';
const webPush = require('web-push');

const sendPushNotification = async () => {
  const publicKey =
    'BK9FZUL3u5bgvs8NlurUeFesIq5dm3qEUwOlh3hL7wGPbNec2SELGLwjKU2jWv9P9GULDvlWlC04Lric-w8yEf8';
  const privateKey = 'EctJtRAxWnq18ayGbnjcHQ';

  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    'BKygzgxdX4Y-kic62cOFL6SYlEjIXryAyd6i1lqvp2N9F8UQ9-eSCUpyoQxryU-Q-E1Xn0AxdFOZFvFxdVksKdI',
    'AWDM9R15IL7prFSo3EmNjIyoz3w8f1d5-bbp01emJHo'
  );
  const pushSubscription = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/cXPpv3DCUkc:APA91bG_RXITNq0m0-qPV6Uf6BRyrk31c7J_RIh-ucDkQxhLa6twipViS1WI_p6uR6FBuTy_HHGR2S9g7a8TTF35cEwO1QXb8zUXwxyb7D3ZQESVE8BLKjR63DqSeyBcgcuxuZZBm6ND',
    expirationTime: Math.floor(Date.now() / 1000) + 10,

    keys: {
      auth: privateKey,
      p256dh: publicKey,
    },
  };
  /*  const response = await webPush.sendNotification(
    pushSubscription,
    JSON.stringify({
      title: 'Hello from script',
      message: 'Your web push notification is here!',
    })
  ); */
  console.log(pushSubscription);
  try {
    await fetch('http://localhost:3000/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription: pushSubscription,
        message: 'Hello from script',
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.log(error);
  }
};

sendPushNotification();
