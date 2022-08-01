import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { theme } from '../chakra/theme';
import { RecoilRoot } from 'recoil';
import { useApollo } from '../lib/apolloClient';
import Layout from '../modules/components/Layout';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  credentials: 'same-origin',
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Head>
          <title>Reddit</title>
          <meta name='description' content='A Reddit clone' />
          <link rel='icon' href='/favicon.ico' />
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>

        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
