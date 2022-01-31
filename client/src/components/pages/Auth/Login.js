import { Link } from "react-router-dom"
import { useRef, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../../../Apollo/Operations/queries'
import { FORGETPASSWORD } from '../../../Apollo/Operations/mutations'
import { useLazyQuery, useMutation} from '@apollo/client'
import { Alert } from '../../Alert/Alert'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import { UserFunc } from '../../../Apollo/reactiveVariables/User'
import Title from "../../Title/Title"
import './auth.css'


function Login(){
    const [active, setActive] = useState('login')
    const email  = useRef('')
    const password  = useRef('')
    const navigate = useNavigate()
    
    const [login, {loading}] = useLazyQuery(LOGIN_USER, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if(!data.loginUser){
                return true
            }
            console.log(data)
            UserFunc({type: 'LOGIN_USER', data: data.loginUser})
            return navigate('/')
        },
        onError: async (err) => {
            const message = err.graphQLErrors[0]?.message
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            AlertFunc({type: 'ERROR_ALERT', data: message})
            return true
        }
    })
    const [fPW, {loading: FPW}] = useMutation(FORGETPASSWORD, {
        fetchPolicy: "network-only",
        onCompleted: async (data) => {
            await setTimeout(() => {
                setActive('login')
                AlertFunc({type: 'CLOSE_ALERT'})
            }, 5000)
            AlertFunc({
                type: 'SUCCESS_ALERT', 
                data: `${data.forgetPassword}`
            })
        },
        onError: async (err) => {
            const message = err.graphQLErrors[0]?.message
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            return AlertFunc({type: 'ERROR_ALERT', data: message})
        }
    })
    function submit(e){
        e.preventDefault()

        login({
            variables: {
                email: email.current.value,
                password: password.current.value
            }
        })
    }
    function forgetPassWord(e){
        e.preventDefault()
        fPW({
            variables: {
                email: email.current.value
            }
        })
    }
    return(
        <>
            <Title title="my account" location="login" />
            <form onSubmit={(e) => {
                switch (active){
                    case 'login': {
                        submit(e)
                    }
                    break;
                    case 'forgetPassWord': {
                        forgetPassWord(e)
                    }
                    break;
                }
            }}>
                <h3>User Login</h3>
                <Alert />
                <div className="input-field">
                    <i class="fa fa-user"></i>
                    <input 
                    type="email" 
                    placeholder="Your Email"
                    ref={email}/>
                </div>
                <div className="input-field">
                    <i class="fa fa-lock"></i>
                    <input  
                    type="password" 
                    placeholder="Your Password"
                    ref={password}/>
                </div>
                <button type="submit">{
                    loading || FPW? 'Loading...': 
                    active !== 'login'?
                    'Send New Password':
                    'Login'
                }</button>
                { 
                        active === 'login' ?
                        <p 
                        onClick={async () => {
                            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
                            AlertFunc({type: 'INFO_ALERT', data: "please Provide your email and click on the send new password"})
                            setActive('forgetPassWord')
                        }}>Forgot Password</p> :
                        active === 'forgetPassWord' &&
                        <p 
                        onClick={async () => {
                            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
                            AlertFunc({type: 'INFO_ALERT', data: "please Login with the new password"})
                            setActive('login')
                        }}>Login</p> 
                    }
                <Link to="/sign-up" className="btn">Create An Account</Link>
            </form>
        </>
    )
}

export default Login