import { makeVar } from '@apollo/client'

const AuthAlertVar = makeVar([])
const AlertVar = makeVar([])

function AlertFunc(action){
    switch(action.type){
        case 'CLOSE_ALERT2':{
            return AuthAlertVar([{
                ...AuthAlertVar()[0],
                message: "",
                type: "",
                show: "",
                display1: false
            }])
        }
        
        case 'ERROR_ALERT2': {
            return AuthAlertVar([{
                ...AuthAlertVar()[0],
                message: action.data,
                type: "danger",
                show: "active",
                display1: true
            }])
        }
        
        case 'SUCCESS_ALERT2': {
            return AuthAlertVar([{
                ...AuthAlertVar()[0],
                message: action.data,
                type: "success",
                show: "active",
                display1: true
            }])
        }
        
        case 'CLOSE_ALERT':{
            return AlertVar([{
                ...AlertVar()[0],
                message: "",
                type: "",
                show: "",
                display: false
            }])
        }
        
        case 'ERROR_ALERT': {
            return AlertVar([{
                ...AlertVar()[0],
                message: action.data,
                type: "danger",
                show: "active",
                display: true
            }])
        }
        case 'SUCCESS_ALERT': {
            return AlertVar([{
                ...AlertVar()[0],
                message: action.data,
                type: "success",
                show: "active",
                display: true
            }])
        }
        case 'INFO_AUTH_ALERT': {
            return AuthAlertVar([{
                ...AuthAlertVar()[0],
                display1: true,
                message: action.data,
                type: "info",
                show: "active",
            }])
        }
        default: {
            return AuthAlertVar()
        }
    }
}

export {
    AlertFunc,
    AuthAlertVar,
    AlertVar
}