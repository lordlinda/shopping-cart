import React from 'react'
import { CartItemType } from '../App'
import CartItem from './CartItem';

type Props= {
    cartItems: CartItemType[];
    addToCart:(item:CartItemType)=> void
    removeFromCart:(id:number)=> void
}
const Cart:React.FC<Props> = ({cartItems,addToCart,removeFromCart}) => {
    const calculateTotal =(items:CartItemType[])=>
    items.reduce((acc,item)=>acc+(item.price * item.amount),0)
  return (
    <div className='cartContainer'>
        <h2>Your shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p>:
        cartItems.map(item =>
            <CartItem 
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            />
            )
        }
        <h2>Total: ${(calculateTotal(cartItems)).toFixed(2)}</h2>
    </div>
  )
}

export default Cart