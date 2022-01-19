import { ApolloClient, HttpLink} from "@apollo/client"
import cache from './cache'

const link = new HttpLink({ 
    uri: "/graphql",
    useGETForQueries: true
});

const client = new ApolloClient({
    link,
    cache
})

export default client