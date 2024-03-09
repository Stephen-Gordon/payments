
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    children: React.ReactNode
}

const AuthenticatedPage = ({ children }: Props) => {
    const router = useRouter()
    const { ready, authenticated } = usePrivy()

    useEffect(() => {
        if (ready && !authenticated) router.push('/')
    }, [ready, authenticated, router])

    return (
        <div>

            <main className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'>
                <div className='p-6'>{children}</div>
            </main>

        </div>
    )
}

export default AuthenticatedPage
