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
      /* console.log("standalone in auth page " , isStandalone) */


       if (window) {
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

       }

    /*   if (!isStandalone) {

        router.push('/');
      } */
     /*  if (authenticated && zeroDevReady) {
        // route home
        console.log('authenticated');
        router.push('/home');
      } else {
        router.push('/login');
      }
            */
         


      
    }, [authenticated, zeroDevReady]); 
    return (
        <> {children}</>
    )
}