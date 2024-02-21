//import { NextRequest, NextResponse } from 'next/server';
const webPush = require('web-push');

const sendPushNotification = async () => {
  /* const publicKey =
    'BK9FZUL3u5bgvs8NlurUeFesIq5dm3qEUwOlh3hL7wGPbNec2SELGLwjKU2jWv9P9GULDvlWlC04Lric-w8yEf8';
  const privateKey = 'EctJtRAxWnq18ayGbnjcHQ'; */
  const publicKey =
    'BKIvDJTEdSWEOc3P_-QtcaNhcBYbpESr6KXM2S7oCmlnkdgwAz1wHn8T17OZDrpkDw5GkfiHwrePpgzh55e4Qt4';
  const privateKey = '5Lys2yFtv71OQnusHfZNNQ';
  /* webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicKey,
    privateKey
  ); */
  const pushSubscription = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/cFpbxV7KLYc:APA91bHFlDQI1HYpYr7NMl2Y67B6WtjQRcejgewG1jhRPeJWR3wrIgIrYpWgkv8tOMsPUmAJcFHsB3up8EvpVWjfntCnir34fE827JK8u56fQ2FSmE8dhWZva21_lu08SxO2UUXjtSLf',
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
    await fetch('https://payments-lyart.vercel.app/notifications', {
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
