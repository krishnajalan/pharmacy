
import React from 'react';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import {Navbar} from "./components";
import GlobalStyle from './globalStyles';
import Home from './pages/HomePage/Home';
import Footer from './components/Footer/index';
import signin from './components/Signin/index';
import register from './components/Register';
import AuthRoute from './components/AuthRoutes/AuthRoute'
import {QueryClient, QueryClientProvider} from 'react-query';
import Doctors from "./containers/doctorsPage/Doctors";
import Product from "./components/Products/Product";
import Cart from "./components/Cart/Cart";
import Appointments from "./components/Appointments/Appointment";
 
import Checkout from "./components/Checkout/Checkout";
 
import Adminservice from './components/AdminServices/Adminservice';
import Admindoc from './components/AdminAddDoctor/Admindoc';
import Adminpro from './components/AdminaddProduct/Adminpro';
import Order from './components/Orders/Orders';

 

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle/>
        <Navbar/>
        <Switch>
          <AuthRoute path="/" exact component={Home}/>
          <AuthRoute path="/home" exact component={Home}/>
          <AuthRoute path="/signin" exact component={signin}/>
          <AuthRoute path="/signup" exact component={register}/>
          <AuthRoute path="/doctors" exact component={Doctors}/>
          <AuthRoute path="/product" exact component={Product}/>
          <AuthRoute path="/cart" exact component={Cart}/>
          <AuthRoute path="/adminservice" exact component={Adminservice}/>
          <AuthRoute path="/appointments" exact component={Appointments}/>
          <AuthRoute path="/Checkout" component={Checkout}/>
          <AuthRoute path="/AdminDoc" component={Admindoc}/>
          <AuthRoute path="/order" component={Order}/>
          <AuthRoute path="/AdminProducts" component={ Adminpro}/>
        </Switch>
        <Footer/>
      </Router>
     </QueryClientProvider>
  );
}

export default App;
