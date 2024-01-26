import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../GlobalRedux/Features/login/loginSlice'
import { RootState } from '../../GlobalRedux/store'
import { useEffect } from 'react'

import { Connect } from "../../components";


export default function Login() {


    const loginState = useSelector((state: RootState) => state.login.value)

    //Redux
    const dispatch = useDispatch()
    const handleConnect = () => {
        dispatch(login())
        console.log('connected')
    }
    useEffect(() => {
        console.log('loginState', loginState)
    }, [loginState])

    return (
			<div>
				<h1>Login</h1>
				<Connect />

				{loginState && <p>logged in</p>}
			</div>
		);
}