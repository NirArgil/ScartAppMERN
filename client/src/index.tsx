import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
        
        <Header />
         <App />
        <Footer />

      </QueryClientProvider>
  </React.StrictMode>
  ,document.getElementById('root')
);
