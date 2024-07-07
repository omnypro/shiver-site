import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.AUTH_TWITCH_ID;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH_TWITCH_REDIRECT_URI;
  const scope = 'user_read';
  const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  return NextResponse.redirect(authUrl);
}
