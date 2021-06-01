import Card from "./Card";
import SearchBar from "../../components/SearchBar/Search";
import Fuse from "fuse.js";
import "./Cart.css";
import React, { useEffect, useState } from "react";
import {useQuery} from 'react-query'
import {getCartAction, removeFromCartAction} from '../../actions/user'
import emptycart from './emptycart.svg';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';

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


function Cart() {
  let history = useHistory();

const redirect = () => {
  history.push('/Checkout')
}



  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      {/* <SearchBar
        placeholder="search"
        onChange={(e) => {finshsearch(true); searchData(e.target.value)}}
      /> */}
      <div className="Container">
        {(results)?results.map((item) => (
          <Card
            _id={item._id}
            image={item.url}
            medname={item.name}
            medcomposition={item.composition}
            brandname={item.brandname}
            price={item.price}
          />
        )): 
        <img style={{height:'400px', width:'400px', justifyContent:'center', display:'block', marginLeft: 'auto',
        marginRight: 'auto'}} src={emptycart}></img>
        }
      </div>
      <div className="Container"> 
      <Link to="/Checkout" style= {{cursor:'pointer', color:'white', textDecoration:'none', border:'2px solid green',borderRadius:'4px', backgroundColor:'green', margin:'12px', padding:'10px'}}>Checkout</Link>
      
       
                           
  
      {/* <Modal

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
            <h2 id="transition-modal-title">Your Order will be delivered within 2 days.</h2>
 
                     
          </div>
        </Fade>
      </Modal> */}
      </div>
    </div>
  );
}

export default Cart;
