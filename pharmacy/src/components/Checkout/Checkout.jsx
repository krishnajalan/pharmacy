import Card from "./Card";
import Fuse from "fuse.js";
import "./Checkout.css";
import React, { useEffect, useState } from "react";
import {useQuery} from 'react-query'
import {getCartAction, removeFromCartAction} from '../../actions/user'
import emptycart from './emptycart.svg';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { addOrder } from "../../api";
 
 
 
 
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  


const Checkout = () => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload()
  }

  const handleProceed = async () => {
    await addOrder();
    handleOpen()
  }

  const data = useQuery("cartdata", async () => await getCartAction());
  const [products, setProducts] = useState([])
  const [search, finshsearch] = useState(false)

  useEffect(()=>{
    if (!data.isLoading && data.isSuccess)
      {
        if (!search){
          setProducts(data.data.data)
          setResult(products)
        }
      }
  }, [data])

  const [results, setResult] = useState([]);

  const searchData = (pattern) => {
    if (!pattern) {
      setResult(products);
      finshsearch(false);
      return;
    }

    const fuse = new Fuse(results, {
      keys: ["name", "brandname", "composition"],
    });

    const result = fuse.search(pattern);
    const matches = [];
    
    if (!result.length) {
      setResult([]);
      
    } else {
      result.forEach(({item}) => {
        matches.push(item);
      });
       
      setResult(matches);
       
    }
    
  };

  return (
    <div className="page">
      
      <div className="Container">
        {(results)?results.map((item) => (
          <Card
          _id={item.product._id}
          image={item.product.url}
          medname={item.product.name}
          medcomposition={item.product.composition}
          brandname={item.product.brandname}
          price={item.product.price}
          quantity={item.quantity}
          />
        )): 
        <img style={{height:'400px', width:'400px', justifyContent:'center', display:'block', marginLeft: 'auto',
        marginRight:'auto'}} src={emptycart}></img>
        }
      </div>
      <div className="Container"> 
      <button style={{color:'#fff', backgroundColor:'#78AB46', padding:'8px', outline:'none', cursor:'pointer', borderRadius:'10px'}} type="button" onClick={handleProceed}>
         Proceed Order
      </button>

      <Modal

       style={{backdropFilter:'blur(5px)'}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div  style={{backgroundColor:'#78AB46', width:'300px',height:'auto', borderRadius:'20px'}} className={classes.paper}>
            <h2 id="transition-modal-title"> Thankyou for Ordering ! Your Order will be delivered soon.</h2>             
          </div>
        </Fade>
      </Modal>
      </div>
    </div>
  );
}

export default Checkout
