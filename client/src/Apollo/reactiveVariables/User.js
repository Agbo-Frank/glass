import { makeVar } from '@apollo/client'

const UserVar = makeVar([])

function UserFunc(action){
    switch (action.type){
        case 'LOGIN_USER':{
            localStorage.setItem('Token', action.data?.token)
            return UserVar([{
                ...UserVar()[0],
                name:action.data?.user.name,
                email: action.data?.user.email,
                token: localStorage.getItem('Token'),
                isLoggedIn: true
            }])
        }
        case 'LOAD_USER':{
            return UserVar([{
                ...UserVar()[0],
                name:action.data?.name,
                email: action.data?.email,
                token: localStorage.getItem('Token'),
                isLoggedIn: true
            }])
        }
        case 'LOGOUT':{
            localStorage.removeItem('Token')
            return UserVar([{
                ...UserVar()[0],
                name:'',
                email: '',
                isLoggedIn: false
            }])
        }
        default:{
            return UserVar()
        }
    }
}

export {
    UserFunc,
    UserVar
}