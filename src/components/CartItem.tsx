import Button from '@mui/material/Button';
import React from 'react'
import { CartItemType } from '../App'

type Props ={
    item:CartItemType;
    addToCart:(item:CartItemType)=> void
    removeFromCart:(id:number)=> void
}
const CartItem :React.FC<Props>= ({item,addToCart,removeFromCart}) => {
  return (
    <div className='cartItemContainer'>
        <h3>{item.title}</h3>
        <div className='cartItems'>
          <div>
          <div className="information">
            <p>Price :${item.price}</p>
            <p>Total : ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
            <Button size='small' disableElevation variant='contained' onClick={()=>removeFromCart(item.id)}>-</Button>
            <p>{item.amount}</p>
            <Button size='small' disableElevation variant='contained' onClick={()=>addToCart(item)}>+</Button>
        </div>
          </div>
       
        <img src={item.image} alt={item.title} className='cartImg'/>
        </div>
        
        
    </div>
  )
}

export default CartItem