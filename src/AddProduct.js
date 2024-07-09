import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";



function AddProduct({ onCreatedProduct }) {
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleClose = () => {
      setShow(false);
      setValidated(false); // Reset validated state on close
    };
    const handleShow = () => setShow(true);
  
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {
      setSelectedImage(event.target.files[0]);
      
    };
    function handleFileSubmit(event) {
      event.preventDefault()
      const url = 'http://localhost:3004/uploads';
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
    
  
    const createProduct = async () => {
      try {
        const response = await axios.post("http://localhost:3004/api/products", {
         name: name,
         description: description,
         price: price,
         image: image,
         categoryId:categoryId
        });
        console.log('Product created successfully:', response.data);
  
        //setUser([...user, response.data]);  // mapping
        setSelectedImage(null);
        onCreatedProduct(); // your event
        setValidated(false); // Reset validated state on close
      } catch (error) {
        console.error('Error uploading image:', error);;

      }
    };

  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false ) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        createProduct();
        event.preventDefault();
        event.stopPropagation();
        handleClose();
      }
  
      setValidated(true);
    };
  
  

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Your Name"
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please choose a Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="product description"
                  autoFocus
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
          <button onClick={handleFileSubmit}>Upload</button>
  
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select isvalid={categoryId !== ''} required value={categoryId} onChange={(e) =>setCategoryId(e.target.value)} aria-label="Default select example">
                <option value={''}>Select Category</option>
                
                  <option value="1"> Comedy </option>
                  <option value="2"> Action </option>
                  <option value="3"> Horror </option>
        
              </Form.Select>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default AddProduct;