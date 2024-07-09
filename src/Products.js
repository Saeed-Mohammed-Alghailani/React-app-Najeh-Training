import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AddProduct from "./AddProduct";
import swal from "sweetalert";

function Products() {
  const [products, setProducts] = useState([]);
  // const urlParams = new URLSearchParams(window.location.search);
  // const username = urlParams.get("name");

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

<div class="divv"></div>
      <AddProduct onCreatedProduct={fetchProducts} />

      <select
        onChange={(e) => {
          fetchProductsByCategory(e.target.value);
        }}
      >
        <option value="0">All Categories</option>
        <option value="1">Comedy</option>
        <option value="2">Action</option>
        <option value="3">Horror</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (OMR)</th>
            <th>Image</th>
            <th>Category ID</th>
            <th><i className="bi bi-pencil-square"> </i></th>
            <th><i className="bi bi-trash"> </i></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr>
              <td> {p.Id} </td>
              <td> {p.Name} </td>
              <td> {p.Description} </td>
              <td> {p.Price} </td>
              <td>
                <img
                  src={`https://saidmohammed-app-5edbe9f026ce.herokuapp.com/uploads/` + p.Image}
                  alt={p.Image}
                  width="100"
                  height="100"
                />
              </td>
              <td> {p.CategoryId} </td>
              <td>
                {" "}
                <a
                  class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href="#"
                  onClick={() => getProductEdit(p.Id)}
                >
                  Edit <i className="bi bi-pencil-square"> </i>
                </a>{" "}
              </td>
              <td>
                {" "}
                <a
                  className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  href="#"
                  onClick={() => deleteProduct(p.Id)}
                >
                  Delete <i className="bi bi-trash"> </i>
                </a>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
                autoFocus
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
                autoFocus
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
