import { InMemoryCache } from '@apollo/client'
import {CartVar} from '../reactiveVariables/Cart'
import { UserVar } from '../reactiveVariables/User'

const cache = new InMemoryCache({
    typePolicies: {
        getUser: {
            fields:{
                name:{
                    read(){
                        return UserVar()[0].name;
                    }
                },
                email:{
                    read(){
                        return UserVar()[0].email;
                    }
                },
                cart:{
                    read(){
                        return CartVar();
                    },
                    merge(existing, incoming) {
                        return [...existing, ...incoming];
                    }
                }
            }
        }
    }
})

export default cache