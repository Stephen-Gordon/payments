import { useRouter } from "next/navigation";
import { useEffect } from "react"

// privy
import { usePrivySmartAccount } from "@zerodev/privy";

// hooks
import useUserAgent from '@/app/hooks/useUserAgent';


export default function AuthPage ({children} : {children: React.ReactNode}) {

    const router = useRouter();

    
    const { authenticated, login, zeroDevReady, user } = usePrivySmartAccount();
    const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

     useEffect(() => {

      /* Uncomment for auth   */
       /* if (window) {
        console.log("window is here") 
         if (window.matchMedia('(display-mode: standalone)').matches) {
          console.log('standalone')
          if (authenticated && zeroDevReady) {
            // route home
            console.log('authenticated');
            router.push('/home');
          } else {
            router.push('/login');
          }
         } else {
          console.log('not standalone')
           router.push('/');
         }

       } */

         


      
    }, [authenticated, zeroDevReady]); 
    return (
        <> {children}</>
    )
}