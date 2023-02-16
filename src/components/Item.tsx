import { Button } from '@mui/material';
import { CartItemType } from '../App'
import '../App.css'
type Props ={
    item:CartItemType,
    handleAddToCart:(item:CartItemType)=> void;
}
function Item({item,handleAddToCart}:Props) {
  return (
    <div>
        <img src={item.image} alt={item.title} className='itemImg'/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>$ {item.price}</p>
        </div>
        <Button 
        variant='outlined'
        className='itemBtn'
        onClick={()=> handleAddToCart(item)}>
         Add to Cart
        </Button>
    </div>
  )
}

export default Item