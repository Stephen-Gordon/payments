'use client'
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react"

// privy
import { usePrivySmartAccount } from "@zerodev/privy";
import { setSheet } from "@/GlobalRedux/Features/sheet/sheetSlice";
import { useDispatch } from "react-redux";


export default function AuthPage ({children} : {children: React.ReactNode}) {

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    //const { authenticated } = usePrivySmartAccount();
    const authenticated = true;
     useEffect(() => {  
      
        if (!authenticated) {
          router.push('/login');
        } 

    }, [authenticated]); 

    useEffect(() => {
      if (pathname == 'home') {
        dispatch(setSheet(false));
      }
    }, [pathname]); 
    return (
       <div className="h-full">{
        authenticated &&  (
            <div className="h-full">
                {children}
            </div>
        ) }
      </div>
    )
}