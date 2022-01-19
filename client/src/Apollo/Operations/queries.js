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

export {
    LOGIN_USER,
    GET_USER,
    GET_PRODUCTS,
    SEARCH 
}