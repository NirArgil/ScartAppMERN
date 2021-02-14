import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import Footer from './Footer/Footer';
import  { Router }  from "react-router-dom";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>       

         <App />
        <Footer />

      </QueryClientProvider>
  </React.StrictMode>
  ,document.getElementById('root')
);
