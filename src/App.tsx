import { useQuery } from 'react-query'
import { useState } from 'react'
import { Badge, Drawer, Grid, IconButton, LinearProgress } from '@mui/material';
import Item from './components/Item';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from './components/Cart';

export type CartItemType ={
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts=async():Promise<CartItemType[]> =>{
  try {
    const products = await (await fetch(`https://fakestoreapi.com/products`)).json()
    return products;
    
  } catch (error) {
    console.log(error)
    throw (error)
  }
}


function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const getTotalItems=(items:CartItemType[])=>{
    return items.reduce((acc:number,item)=> acc +item.amount,0);
   }
   
   const handleAddToCart=(item:CartItemType)=>{
     setCartItems(prev=>{
       //1. is the item already in the cart
       const isItemInCart = prev.find(cartItem => cartItem.id === item.id)
         console.log(isItemInCart)
       if(isItemInCart){
        return prev.map(cartItem=>
          cartItem.id === item.id
          ? {...cartItem,amount:cartItem.amount + 1}
          :cartItem
          )
       }
       console.log("not in cart")
       //2.First time the item is added
       return [...prev,{...item,amount:1}]
     })
   }
   const handleRemoveFromCart=(id:number)=>{
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
   }
   
   
   
  const {data,isLoading,error}=useQuery<CartItemType[]>('products',getProducts)
 
  return (
    <div className='itemContainer'>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
<Cart cartItems={cartItems}
addToCart={handleAddToCart}
removeFromCart={handleRemoveFromCart}
/>
      </Drawer>
      <IconButton onClick={()=>setCartOpen(true)}>
<Badge badgeContent={getTotalItems(cartItems)} color='error'>
 <AddShoppingCartIcon/>
</Badge>
      </IconButton>
    {
      isLoading ? <LinearProgress/>
      :error ? <div>Something went wrong...</div>
      :<Grid container spacing={3}>
        {
       data?.map(item => (
      <Grid item key={item.id} xs={12} sm={4}>
      <Item item={item} handleAddToCart={handleAddToCart}/>
     </Grid>
     ))}
      </Grid>
    }
  </div>
  );
}

export default App;
