import React from 'react';
import './App.css';
import BookList from "./components/bookList";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import AddBook from "./components/addBook";

const client = new ApolloClient({
    uri: 'http://localhost:8888/graphql',
    cache: new InMemoryCache()
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App">
                    <BookList/>
                    <AddBook />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
