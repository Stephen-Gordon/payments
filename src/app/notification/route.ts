// This file is responsible for sending the notification to the user
import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';

export const POST = async (req: NextRequest) => {
  // get the subscription and message from the request body
  const { subscription, message } = (await req.json()) as {
    subscription: webPush.PushSubscription;
    message: string;
  };
  console.log(subscription);
  // pass in the ENV variables for the email, public key, and private key
  try {
    webPush.setVapidDetails(
      `mailto:${process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY
    );
    // send the notification to the user
    const response = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: `${message}`,
        message: ``,
      })
    );
    return new NextResponse(response.body, {
      status: response.statusCode,
      headers: response.headers,
    });
  } catch (err) {
    if (err instanceof webPush.WebPushError) {
      return new NextResponse(err.body, {
        status: err.statusCode,
        headers: err.headers,
      });
    }
    console.log(err);
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
};
