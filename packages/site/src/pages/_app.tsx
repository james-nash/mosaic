// eslint-disable import/no-duplicates
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  BaseUrlProvider,
  Image,
  Link,
  Metadata,
  SessionProvider,
  SidebarProvider
} from '@jpmorganchase/mosaic-site-components';
import { ImageProvider, LinkProvider, ThemeProvider } from '@jpmorganchase/mosaic-components';
import { LayoutProvider } from '@jpmorganchase/mosaic-layouts';
import { useCreateStore, StoreProvider } from '@jpmorganchase/mosaic-store';
import { components as mosaicComponents } from '@jpmorganchase/mosaic-site-components';
import { layouts as mosaicLayouts } from '@jpmorganchase/mosaic-layouts';
import '@jpmorganchase/mosaic-site-preset-styles/dist/index.css';

import { MyAppProps } from '../types/mosaic';

const components = mosaicComponents;
const layoutComponents = mosaicLayouts;

export default function MyApp({ Component, pageProps = {} }: AppProps<MyAppProps>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { session, sharedConfig, source: { frontmatter = {} } = {} } = pageProps;

  console.log('ENV', process.env.MOSAIC_URL);

  const storeProps = { sharedConfig, ...frontmatter };
  const createStore = useCreateStore(storeProps);
  return (
    <SessionProvider session={session}>
      <StoreProvider value={createStore()}>
        <Metadata Component={Head} />
        <ThemeProvider>
          <BaseUrlProvider>
            <ImageProvider value={Image}>
              <LinkProvider value={Link}>
                <SidebarProvider>
                  <LayoutProvider layoutComponents={layoutComponents}>
                    <Component components={components} {...pageProps} />
                  </LayoutProvider>
                </SidebarProvider>
              </LinkProvider>
            </ImageProvider>
          </BaseUrlProvider>
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
