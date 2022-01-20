import { ApolloClient, HttpLink} from "@apollo/client"
import cache from './cache'

const link = new HttpLink({ 
    uri: '/graphql',
    useGETForQueries: true
});

const client = new ApolloClient({
    link: new HttpLink({ 
        uri: '/graphql',
        useGETForQueries: true
    }),
    cache
})

export default client