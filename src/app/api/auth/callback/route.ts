import { type NextRequest, NextResponse } from 'next/server';
import axios from 'redaxios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const clientId = process.env.AUTH_TWITCH_ID;
  const clientSecret = process.env.AUTH_TWITCH_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH_TWITCH_REDIRECT_URI;

  try {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
      }
    );

    console.log(response);
    const { access_token, refresh_token } = response.data;

    // Redirect back to Shiver with both tokens.
    const appRedirectUri = `shiver://auth?access_token=${access_token}&refresh_token=${refresh_token}`;
    return NextResponse.redirect(appRedirectUri);
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
