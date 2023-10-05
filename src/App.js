import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import GetUsers from './Components/GetUsers';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com',
});

const link = from([errorLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <div className="App">
    <div class="heading">Country List</div>
    <ApolloProvider client={client}>
      <GetUsers />
    </ApolloProvider>
    </div>
  
  );
}

export default App;
