import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';

export const POST = async (req: NextRequest) => {
  if (
    !process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL ||
    !process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY
  ) {
    throw new Error('Environment variables supplied not sufficient.');
  }
  const { subscription, message } = (await req.json()) as {
    subscription: webPush.PushSubscription;
    message: string;
  };
  console.log(subscription);
  try {
    webPush.setVapidDetails(
      `mailto:${process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY
    );
    const response = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: `Payments`,
        message: `${message}`,
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
