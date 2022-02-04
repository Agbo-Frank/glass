import { CartLength, SaveLength } from './Apollo/reactiveVariables/Cart'
import { AlertFunc } from './Apollo/reactiveVariables/Alert'
import { UserVar } from './Apollo/reactiveVariables/User';
import { Link } from 'react-router-dom'

const token = localStorage.getItem('Token');
console.log(token)

const configuration = {
    context:{
        headers:{
            authToken: token 
        }
    },
    onCompleted: async (data) => {
        console.log(token)
        console.log(data)
        if(data.addToCart){
            let id = data.addToCart.split(' ')[0]
            if(!CartLength().includes(id)){
                CartLength([...CartLength(), id])
            }
        }
        if(data.saveItem){
            let id = data.saveItem.split(' ')[0]
            if(!SaveLength().includes(id)){
                SaveLength([...SaveLength(), id])
            }
        }
        await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT2'}), 3000)
        return AlertFunc({type: 'SUCCESS_ALERT2', data: 'Product Successfully Added'})
    },
    onError: async (err) => {
        if(err){
            console.log(token)
            const message1 = err.networkError
            console.log(message1, err.graphQLErrors)
            await setTimeout(() => AlertFunc({type: 'CLOSE_ALERT2'}), 5000)
            return AlertFunc({type: 'ERROR_ALERT2', data: <>Unsuccessfully Added, Please <Link to="/login" className="alert-link">Login!</Link></>})
        }
    }
}

export {
    configuration
}