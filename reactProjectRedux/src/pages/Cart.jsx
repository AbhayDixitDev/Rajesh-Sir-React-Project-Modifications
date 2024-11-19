import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { qntyInc, qntyDec } from "../cartSlice"; // Import qntyDec action
import './Cart.css'; // Import the CSS file for dark mode

const Cart=()=>{
    const MyCart= useSelector(state=>state.mycart.cart);
    const dispatch=useDispatch();

    const qtyIncrement=(id)=>{
         dispatch(qntyInc({id:id}));
    }

    const qtyDecrement=(id)=>{
         dispatch(qntyDec({id:id}));
    }

    const Data=MyCart.map((key)=>{
        return(
            <>
               <tr>
                <td> <img src={key.image} width="100" height="100" /> </td>
                <td> {key.name} </td>
                <td> {key.description} </td>
                <td>{key.category}</td>
                <td> {key.price}</td>
                <td>
                    
                <a href="#" onClick={()=>{qtyDecrement(key.id)}}>
                    <FaCircleMinus />
                </a>

                <span style={{marginLeft:'10px', marginRight:'10px', fontWeight:'bold'}}>
                {key.qnty}
                </span>
                    
                    
                <a href="#" onClick={()=>{qtyIncrement(key.id)}}>
                    <FaPlusCircle />
                </a>
                     


                </td>
                <td> {key.price*key.qnty} </td>
               </tr>
            
            </>
        )
    })
    return(
        <div className="cart-container">
           <h1 className="cart-title"> My Shopping Cart</h1>
           <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Description</th>
          <th>Category</th>
          <th> Price</th>
          <th> Quantity</th>
          <th> Total</th>
        </tr>
      </thead>
      <tbody>
         {Data}
        </tbody>
        </Table>

           
        </div>
    )
}

export default Cart;