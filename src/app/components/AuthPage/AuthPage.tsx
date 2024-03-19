import { useRouter } from "next/navigation";
import { useEffect } from "react"

// privy
import { usePrivySmartAccount } from "@zerodev/privy";

export default function AuthPage ({children} : {children: React.ReactNode}) {

    const router = useRouter();

    
    const { authenticated, login, zeroDevReady, user } = usePrivySmartAccount();

    useEffect(() => {
      if ( authenticated && zeroDevReady) {
        // route home
        console.log('authenticated');
        router.push('/home');
      } else {
        router.push('/login');
      }
    }, [ authenticated, zeroDevReady]);
    return (
        <> {children}</>
    )
}