import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CarCardProvider } from '@/components/context/CarCardContext';
import { OrdersProvider } from '@/components/context/OrderContext';
import { AuthProvider } from '@/components/context/AuthContext';
import { CrudProvider } from '@/components/context/CrudContext';
import { MiscProvider } from '@/components/context/MiscContext';
import { RealEstateProvider } from '@/components/context/RealEstateContext';
import { I18nProvider } from '@/i18n/I18nContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <I18nProvider>
        <CarCardProvider>
          <OrdersProvider>
            <AuthProvider>
              <CrudProvider>
                <MiscProvider>
                  <RealEstateProvider>
                    <Component {...pageProps} />
                  </RealEstateProvider>
                </MiscProvider>
              </CrudProvider>
            </AuthProvider>
          </OrdersProvider>
        </CarCardProvider>
      </I18nProvider>
    </SessionProvider>
  );
}
