import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";



function Login() {

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setValidated(false); // Reset validated state on close
      setFailed("")
    };
  
    const handleShow = () => setShow(true);
  
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failed, setFailed] = useState("");
  
    const LoginUser = async () => {
      try {
        const response = await axios.post("https://saidmohammed-app-5edbe9f026ce.herokuapp.com/api/loginuser/", {

          email: email, // get email and assign to key
          password: password, // get password and assign to key
        });
        alert("Welcome, "+ response.data[0].Name)
        handleClose();
        if(email === "admin@gmail.com" && password === "123"){
          window.location = '/adminpage' //  response.data[0].Name
          //setUser([...user, response.data]);  // mapping
          setValidated(false); // Reset validated state on close
        }else{
          window.location = '/productspage'
        }
     
      } catch (error) {
        setFailed("Login Failed , Please Check your Email and Password")
      }
    };
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false || check === "block") {
        event.preventDefault();
        event.stopPropagation();
      } else {
        LoginUser();
        event.preventDefault();
        event.stopPropagation();
        
   
      }
  
      setValidated(true);
    };
  
    const [check, setCheck] = useState("none");
    const [isValid, setIsValid] = useState(false);
  
    
  
  
    return (
      <>
        <a  onClick={handleShow}>
          Login
        </a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate  onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a valid Email.
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  autoFocus
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
  
                <Form.Control.Feedback type="invalid">
                  Please choose a Password.
                </Form.Control.Feedback>
              </Form.Group>
  
              <Modal.Footer>
                <label variant="secondary">
                    {failed}
                </label>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );

}; // end login 

export default Login;
