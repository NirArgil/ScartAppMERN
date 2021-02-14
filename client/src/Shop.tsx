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

import setAuthToken from "./utilities/setAuthToken";

//Styles
import { Wrapper, StyledButton } from './Shop.styles';

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


export const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

const Shop = () => {
  

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
  <Wrapper>

    <p className="intro"><b> Welcome </b> to scart shopping area, <br/> </p>
    <p className="intro2"> Here you can select items you like and add it to your shopping cart.</p>

    < Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
        cartItems={cartItems} 
        addToCart={handleAddToCart} 
        removeFromCart={handleRemoveFromCart}
        />
    </Drawer>
    <StyledButton className="BTN" onClick={() => setCartOpen(true)} >
        <Badge badgeContent = {getTotalItems(cartItems)} color="error">
        <AddShoppingCartIcon />
        </Badge>
    </StyledButton>
    <Grid container spacing={3}>
        {data?.map(item => (
        <Grid item key= { item.id } xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
        </Grid>
        ))}
    </Grid>
</Wrapper>
  );   
};

export default Shop;