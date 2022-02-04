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
    const cPassword  = useRef('')
    const isUser  = useRef(false)

    const navigate = useNavigate()
    
    const [signUp, {loading}] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            if(!data.createUser){
                return false
            }
            UserFunc({type: 'LOGIN_USER', data: data.createUser})
            navigate('/')
        },
        onError: async (err) => {
            const message = err.graphQLErrors[0]?.message
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            return AlertFunc({type: 'ERROR_ALERT', data: message})
        }
    })
    async function submit(e){
        e.preventDefault()

        if(password.current.value !== cPassword.current.value){
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT'}), 5000)
            return AlertFunc({type: 'ERROR_ALERT', data: "please confirm your password"})
        }

        
        signUp({
            variables: {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                cPassword: cPassword.current.value,
                isUser: !isUser.current.checked
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
                    <input type="password" ref={cPassword} placeholder="Confirm Password"/>
                </div>
                <label htmlFor="check">
                    <input type="checkbox" ref={isUser} id="check" />&nbsp;
                    Become a vendor?
                </label>
                <button type="submit">{loading? 'Registering..' : 'Sign up'}</button>
                <Link to="/login" className="btn">Already Have An Account</Link>
            </form>
        </>
    )
}

export default SignUp