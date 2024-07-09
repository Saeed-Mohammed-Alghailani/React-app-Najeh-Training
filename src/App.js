import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './custom.css'; // Import your custom CSS
import React from 'react';
import Layout from './Layout';
import Products from './Products';
import ProductsPage from './ProductsPage';
import Header from './Header';
import Footer from './Footer';
import Home from './HomePage';


function App() {




  return (



      <Router>

        <Routes>

          <Route path='/' element={<Layout/>}/>
          <Route index element={<Home/>}/>
          <Route path='/adminpage' element={<Products/>}/>
          <Route path='/productspage' element={<ProductsPage/>}/>

        </Routes>
        <Footer/>
      </Router>



    

  );
}

export default App;
