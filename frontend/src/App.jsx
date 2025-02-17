import React from 'react';
import './App.css'; // Component-specific styles
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import CreateContact from './components/CreateContact';
import ContactList from './components/ContactList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Contact Management</h1>
        </header>
        <main className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <CreateContact />
            </div>
            <div className="col-md-8">
              <ContactList />
            </div>
          </div>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
