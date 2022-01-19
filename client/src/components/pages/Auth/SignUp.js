import { Link } from "react-router-dom"
import Title from "../../Title/Title"
import { useRef }from 'react'
import {useMutation} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../Alert/Alert'
import { AlertFunc } from '../../../Apollo/reactiveVariables/Alert'
import { UserFunc, UserVar } from '../../../Apollo/reactiveVariables/User'
import {CREATE_USER} from '../../../Apollo/Operations/mutations'
import './auth.css'

function SignUp(){
    const name  = useRef('')
    const email  = useRef('')
    const password  = useRef('')
    const navigate = useNavigate()
    
    const [signUp, {loading}] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log(data.loginUser)
            UserFunc({type: 'LOGIN_USER', data: data.createUser})
            navigate('/')
        },
        onError: async (err) => {
            const message = err.graphQLErrors[0]?.message
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            return AlertFunc({type: 'ERROR_ALERT', data: message})
        }
    })
    function submit(e){
        e.preventDefault()

        signUp({
            variables: {
                name:name.current.value,
                email:email.current.value,
                password:password.current.value
            }
        })
    }
    return(
        <>
            <Title title="my account" location="Sign-up" />
            <form onSubmit={(e) => submit(e)}>
                <h3>User Sign up</h3>
                <Alert />
                <div className="input-field">
                    <i class="fa fa-user"></i>
                    <input 
                    type="text"  
                    placeholder="Your Name"
                    ref={name}/>
                </div>
                <div className="input-field">
                    <i class="fa fa-envelope"></i>
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
                <div className="input-field">
                    <i class="fa fa-lock"></i>
                    <input type="password" placeholder="Confirm Password"/>
                </div>
                <button type="submit">{loading? 'loading' : 'Sign up'}</button>
                <Link to="/login" className="btn">Already Have An Account</Link>
            </form>
        </>
    )
}

export default SignUp