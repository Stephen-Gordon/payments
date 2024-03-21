
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePrivySmartAccount } from '@zerodev/privy'

interface Props {
    children: React.ReactNode
}

const AuthenticatedPage = ({ children }: Props) => {
    const router = useRouter()
    const { zeroDevReady, authenticated } = usePrivySmartAccount()

    useEffect(() => {
        if (zeroDevReady && !authenticated) router.push('/home')
    }, [zeroDevReady, authenticated, router])

    return (
        <div>

            <main className=''>
                <div className=''>{children}</div>
            </main>

        </div>
    )
}

export default AuthenticatedPage
