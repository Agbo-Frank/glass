import{ gql } from '@apollo/client'

const  CREATE_USER = gql`
    mutation CreateUser(
        $name: String!, 
        $email: String!, 
        $password: String!,
        $cPassword: String!,
        $isUser: Boolean){
        createUser(
            name: $name, 
            email: $email, 
            password: $password, 
            cPassword: $cPassword,
            isUser: $isUser){
            token 
            user{
                name
                email
            }
            vendor{
                name
                email
            }
        }
    }
`

const ADD_TO_CART = gql`
    mutation AddToCart($id: String!){
        addToCart(id: $id)
    }
`
const SAVE_ITEM = gql`
    mutation SaveItem($id: String!){
        saveItem(id: $id)
    }
`
const REMOVE_CART_ITEM = gql`
    mutation RemoveFromCart($id: String!){
        removeFromCart(id: $id)
    }
`
const UNSAVE_ITEM = gql`
    mutation UnsaveItem($id: String!){
        unsaveItem(id: $id)
    }
`

const FORGETPASSWORD = gql`
    mutation ForgetPassword($email: String!){
        forgetPassword(email: $email)
    }
`
const CREATE_ORDER = gql`
    mutation CreateOrder(
        $vendorId: String!, 
        $productId: String!, 
        $price: Int!,
        $reference: String){
        createOrder(
            vendorId: $vendorId, 
            productId: $productId, 
            price: $price,
            reference: $reference){
            price
            user{
                name
                email
            }
            product{
                image
                name
            }
        }
    }
`
const CLEARCART = gql`
    mutation ClearCart{
        clearCart
    }
`

export {
    CREATE_USER,
    REMOVE_CART_ITEM,
    ADD_TO_CART,
    FORGETPASSWORD,
    SAVE_ITEM,
    UNSAVE_ITEM,
    CREATE_ORDER,
    CLEARCART
}