// a script to test notifications when developing the app

//import { NextRequest, NextResponse } from 'next/server';
const webPush = require('web-push');

const sendPushNotification = async () => {
  /* const publicKey =
    'BK9FZUL3u5bgvs8NlurUeFesIq5dm3qEUwOlh3hL7wGPbNec2SELGLwjKU2jWv9P9GULDvlWlC04Lric-w8yEf8';
  const privateKey = 'EctJtRAxWnq18ayGbnjcHQ'; */
  const publicKey =
    'BDvbxVcRlXNePbMsC7qHV77hJSuOB5vlxEB9Q0RHAHVY1RX2aaKx6gTG7jn2CUcbp9y25XcRfQVgR0gUhLaPzYc';
  const privateKey = 'KPlsUDm53-TTmJsK7Z14xw';
  /* webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicKey,
    privateKey
  ); */
  const pushSubscription = {
    endpoint:
      'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABl1KyryrbEsojoejhhY9xbKAKH4dax-lQ5i9rH65Q4eNAeQAfiDby2XvRwb2tQzcXIthNlpc29TYndS1QdoQuxRhrfdQimMA-t1_zK6f-VWVfLuQpxWWoev60jJsWDM2-MDOB9VbRhwokwdi6lwqqtATHVkFCapTJc3ZiLwz7dOFeC1KM',
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
    await fetch('https://payments-lyart.vercel.app/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription: pushSubscription,
        message: 'Hello from ste',
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.log(error);
  }
};

sendPushNotification();
