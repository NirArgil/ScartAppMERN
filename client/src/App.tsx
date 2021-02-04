import { useState } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment, useEffect } from "react";

//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Header from './Header/Header';

//Login
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// REDUX
import { Provider } from 'react-redux';
import store from "./store";
import { loadUser } from "./actions/auth";
import { register } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";

//Styles
import { Wrapper, StyledButton } from './App.styles';

//Type
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  }


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

const App = () => {
  useEffect(() => {
    // dispatch the loadUser action by taking the 'store'
    // directly & call dispatch- a method in the 'store'
    // then pass the loadUser action in it to dispatch it.

    // To stop the 'userEffect HOOK' from running on a constant loop,
    // & only have it run once, when its mounted, we pass an empty
    // array [] as a 2nd argument. This now works like a 'componentDidMount'.
    store.dispatch(loadUser());
  }, []);

  const [cartOpen , setCartOpen] = useState (false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data,isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts 
    );
  console.log(data);

const getTotalItems = (items: CartItemType[]) => 
items.reduce((ack: number, item) => ack + item.amount, 0);
  
const handleAddToCart = (clickedItem: CartItemType) => {
   setCartItems(prev => {
     const isItemInCart = prev.find(item => item.id === clickedItem.id);

     if (isItemInCart) {
       return prev.map( item => 
         item.id === clickedItem.id ?
         {...item, amount: item.amount + 1}
         : item
       );
     }
       return [...prev, {...clickedItem, amount: 1 }];

   });  
};

const handleRemoveFromCart = (id: number) => {
  setCartItems(prev => 
    prev.reduce((ack, item) => {
     if (item.id === id) {
       if(item.amount === 1) return ack;
       return [...ack, {...item, amount: item.amount - 1}];
     } else {
      return [...ack, item];      
     }
    }, [] as CartItemType[])
  );
};

if (isLoading) return <LinearProgress />;
if (error) return <div>Somethine went wrong ...</div>;

return ( 
<Provider store={store}>
      <Router>
        <Fragment>
          
         <Header />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );   
};

export default App;
