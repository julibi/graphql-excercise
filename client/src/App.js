import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Books from './components/Books';
import Book from './components/Book';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Route exact path="/" component={Books}/>
        <Route exact path="/book/:id" component={Book}/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
