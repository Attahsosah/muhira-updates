import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { CarCardProvider } from '@/components/context/CarCardContext'
import { OrdersProvider } from "@/components/context/OrderContext";
import { AuthProvider} from "@/components/context/AuthContext";
import { CrudProvider} from "@/components/context/CrudContext";
import { MiscProvider} from "@/components/context/MiscContext";
import { RealEstateProvider} from "@/components/context/RealEstateContext";

export default function App({ Component, pageProps }: AppProps) {
  return  (  <SessionProvider session={pageProps.session}>
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

   </SessionProvider>
  )
}
