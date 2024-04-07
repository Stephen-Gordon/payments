// a script to test notifications when developing the app

const sendPushNotification = async () => {
  /* const publicKey =
    'BK9FZUL3u5bgvs8NlurUeFesIq5dm3qEUwOlh3hL7wGPbNec2SELGLwjKU2jWv9P9GULDvlWlC04Lric-w8yEf8';
  const privateKey = 'EctJtRAxWnq18ayGbnjcHQ'; */
  const publicKey =
    'BKIvDJTEdSWEOc3P_-BI2yIGHOJHYrZaNv_hGamAKOX_VaMaEYILZetpjEva9PDd1S9HsP6afe7WATCHcpJmcoOKbSkEaE_zG2E8zlbIs';
  const privateKey = 'M3WB6JVXESFaBuXTBFcJw';
  /* webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicKey,
    privateKey
  ); */
  const pushSubscription = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/d91W5xF9fDY:APA91bH4-ImywZYwrqaUCdP2mgUQVvmryYmeYi4lxslL568jcP0JdkrVUbcOvjsAi91g_cV3_idplV_F198LeOm11clff8Ili2xWorI-mLkFVAsPe6gWttXCEMxndqYnpvWEsOxiT-iC',
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
