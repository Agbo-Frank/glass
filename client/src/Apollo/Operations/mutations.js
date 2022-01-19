import{ gql } from '@apollo/client'

const  CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!){
        createUser(name: $name, email: $email, password: $password){
            token 
            user{
                name
                email
                _id
            }
        }
    }
`

const ADD_TO_CART = gql`
    mutation AddToCart($id: String!){
        addToCart(itemId: $id){
            message
        }
    }
`
const REMOVE_CART_ITEM = gql`
    mutation RemoveFromCart($id: String!){
        removeFromCart(itemId: $id){
            message
        }
    }
`

const FORGETPASSWORD = gql`
    mutation ForgetPassword($email: String!){
        forgetPassword(email: $email){
            message
        }
    }
`

export {
    CREATE_USER,
    REMOVE_CART_ITEM,
    ADD_TO_CART,
    FORGETPASSWORD
}