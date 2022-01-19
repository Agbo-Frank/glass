import { ApolloClient, HttpLink} from "@apollo/client"
import cache from './cache'

const link = new HttpLink({ 
    uri: 'http://localhost:5500/graphql',
    useGETForQueries: true
});

const client = new ApolloClient({
    link,
    cache
})

export default client