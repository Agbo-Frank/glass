import { gql } from '@apollo/client'

const LOGIN_USER = gql`
    query LoginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            token 
            user{
                name
                email
            }
        }
    }
`
const GET_USER = gql`
    query GetUser{
        getUser{
            name
            email
            cart{
                itemId
            }
            savedItems{
                _id
            }
        }
    }
`
const GET_CART = gql`
    query GetCart{
        getUser{
            cart{
                itemId
                quantity
                product{
                    name
                    _id
                    price
                    image
                }
            }
        }
    }
`
const SEARCH = gql`
    query Search($word: String!){
        search(word: $word){
            name
            _id
            price
            image
        }
    }
`

const GET_PRODUCTS = gql`
    query GetProducts{
        getProducts{
            name
            price
            image
            _id
        }
    }
`
const GET_PRODUCT = gql`
    query GetProduct($id: String!){
        getProduct(id: $id){
            name
            price
            image
            _id
            description
        }
    }
`

export {
    LOGIN_USER,
    GET_USER,
    GET_PRODUCTS,
    SEARCH,
    GET_CART,
    GET_PRODUCT
}