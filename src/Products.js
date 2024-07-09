import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AddProduct from "./AddProduct";
import swal from "sweetalert";
import Logout from "./logout";

function Products() {
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

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      handleClose();
    }

    setValidated(true);
  };

  const handleClose = () => {
    setShow(false);
    setValidated(false); // Reset validated state on close
  };
  const handleShowEdit = () => {
    setShow(true);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [id, setId] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const getProductEdit = async (id) => {
    try {
      const response = await axios.get(
        `https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/product/${id}`
      );
      setName(response.data[0].Name);
      setDescription(response.data[0].Description);
      setPrice(response.data[0].Price);
      setImage(response.data[0].Image);
      setCategoryId(response.data[0].CategoryId);
      setId(response.data[0].Id);
      handleShowEdit();
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  function handleFileSubmit(event) {
    event.preventDefault()
    const url = 'https://saidmohammed-app-5edbe9f026ce.herokuapp.com/uploads';
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('fileName', selectedImage.name);
    setImage(selectedImage.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      alert("file submitted")

    });
  }

  const ModifyProduct = async (id) => {
    try {
      const response = await axios.put(
        `https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/products/${id}`,
        {
          name: name,
          description: description,
          price: price,
          image: image,
          categoryId:categoryId
        }
      );
      setSelectedImage(null)
      console.log('Product Updated successfully:', response.data);
      handleClose();
      fetchProducts();
    } catch (error) {

      alert("Error: " + error);
    }
  };

  const deleteProduct = async (id) => {
    const product = products.find((product) => product.Id === id);
    // if (!user) {
    //   return; // User not found, so nothing to delete
    // }
    // const confirmation = window.confirm(`Are you sure you want to delete user:
    //    -Name: ${user.Name}
    //    -Email: ${user.Email}?`);
    // if (confirmation) {

    swal({
      title: `Are you sure you want to delete this Product?`,
      text: ` -Name: ${product.Name} 
      -Price: ${product.Price}
      Once deleted, you will not be able to recover this Product!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/products/${id}`);
          fetchProducts();
        } catch (error) {
          alert("Error: " + error);
        }
        swal(
          `Poof! The Product: 
          -Name: ${product.Name} 
          -Price: ${product.Price} 
          has been deleted!`,
          {
            icon: "success",
          }
        );
      } else {
        swal("This Product is safe!");
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []); //end effect

  return (
    <>


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
  <div class="divv"></div>

      <div class ="container">
      <AddProduct onCreatedProduct={fetchProducts} />

<select class="form-select "
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
        <button className="buttons">
          <a
                  class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href="#"
                  onClick={() => getProductEdit(p.Id)}
                >
                  Edit <i className="bi bi-pencil-square"> </i>
                </a></button>
                <button><a
                  className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href="#"
                  onClick={() => deleteProduct(p.Id)}
                >
                  Delete <i className="bi bi-trash"> </i>
                </a></button>
     </div>

  ))}


</div>

</div>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Product Name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please Enter Product Name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="product description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please Enter a description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter a Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please Enter a Price.
              </Form.Control.Feedback>
            </Form.Group>
            <h1>React File Upload</h1>
          <input type="file" onChange={handleFileChange}/>
          <button disabled={!selectedImage} onClick={handleFileSubmit}>Upload</button>

            <div>
              <img
                src={`https://saidmohammed-app-5edbe9f026ce.herokuapp.com/uploads/` + image}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%" }}
              />
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select
                isvalid={categoryId !== ""}
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                aria-label="Default select example"
              >
                <option value={""}>Select Category</option>

                <option value="1"> Comedy </option>
                <option value="2"> Action </option>
                <option value="3"> Horror </option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => ModifyProduct(id)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Products;
