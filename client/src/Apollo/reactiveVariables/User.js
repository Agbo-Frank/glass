import { makeVar } from '@apollo/client'
import { AlertFunc } from './Alert'
import { CartLength, SaveLength } from './Cart'

const UserVar = makeVar([])

function UserFunc(action){
    switch (action.type){
        case 'LOGIN_USER':{
            localStorage.setItem('Token', action?.data.token)
            return UserVar([{
                ...UserVar()[0],
                name:action.data?.user.name,
                email: action.data?.user.email,
                token: localStorage.getItem('Token'),
                isLoggedIn: true
            }])
        }
        case 'LOAD_USER':{
            let cartIds = action.data?.cart.map(cart => cart.itemId)
            let savedIds = action.data?.savedItems.map(savedItem => savedItem._id)
            CartLength(cartIds)
            SaveLength(savedIds)
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

            setTimeout(() => AlertFunc({type: 'CLOSE_ALERT2'}), 5000)
            AlertFunc({type: 'SUCCESS_ALERT2', data: "Logout successful"})

            return UserVar([{
                ...UserVar()[0],
                name:'',
                email: '',
                token: null,
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