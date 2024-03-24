import { useRouter } from "next/navigation";
import { useEffect } from "react"

// privy
import { usePrivySmartAccount } from "@zerodev/privy";


export default function AuthPage ({children} : {children: React.ReactNode}) {

    const router = useRouter();

    //const { authenticated } = usePrivySmartAccount();
    const authenticated = true;
     useEffect(() => {

        if (!authenticated) {
          router.push('/login');
        } 

    }, [authenticated]); 
    return (
        <>{authenticated && (
            <>{children}</>
        )}</>
    )
}