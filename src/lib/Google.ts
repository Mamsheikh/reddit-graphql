import { google } from 'googleapis';

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  `${process.env.SERVER_URL}`
);

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  logIn: logInHandler,
};

async function logInHandler(code: string) {
  const { tokens } = await auth.getToken(code);

  auth.setCredentials(tokens);

  const { data } = await google.people({ version: 'v1', auth }).people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos',
  });

  return { user: data };
}
