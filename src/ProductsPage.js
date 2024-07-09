import { useState, useEffect } from "react";
import axios from "axios";
import Logout from "./logout";


function ProductsPage() {
  const [products, setProducts] = useState([]);
  // const urlParams = new URLSearchParams(window.location.search);
  // const username = urlParams.get("name");
   const checklogin = sessionStorage.getItem("email")
   if(!checklogin){
    window.location= "/"
   }
  const fetchProducts = () => {
    axios
      .get("https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  const fetchProductsByCategory = (id) => {
    if (id == 0) {
      fetchProducts();
    } else {
      axios
        .get(`https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/products/${id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); //end effect

  return (
    <div class="bgcolor">
    <header class="p-3 text-bg-dark fixed-top">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-white">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>
        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2"><a><Logout/></a></button>
</div>

      </div>
    </div>
  </header>


      <select class="form-select select"
        onChange={(e) => {
          fetchProductsByCategory(e.target.value);
        }}
      >
        <option value="0">All Categories</option>
        <option value="1">Comedy</option>
        <option value="2">Action</option>
        <option value="3">Horror</option>
      </select>
      
      
      <div class="productpage">

        <div class="outerdiv">
          {products.map((p) => (

             <div class="innerdiv">
                              <img
                  src={`https://saidmohammed-app-5edbe9f026ce.herokuapp.com/uploads/` + p.Image}
                  alt={p.Image}
                  width="250px"
                  height="300px"
                />
                <h4 class="carddet">Movie Name: {p.Name}</h4>
                <p class="carddet">Movie Description: {p.Description}</p>
                <small class="text-body-secondary price">Ticket Price: {p.Price} OMR </small>
                <button class="buy"> Buy Ticket Now</button>
             </div>

          ))}


        </div>

    </div>


    </div>
  );
}

export default ProductsPage;
