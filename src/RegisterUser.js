import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function RegisterUser({ onRegisterdedUser }) {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidated(false); // Reset validated state on close
  };

  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const registereUser = async () => {
    try {
      const response = await axios.post("http://localhost:3004/api/user/", {
        name: name, // get name and assign to key
        email: email, // get email and assign to key
        password: password, // get password and assign to key
      });

      //setUser([...user, response.data]);  // mapping
      onRegisterdedUser(); // your event'
      setConfirm(""); // reset any textbox by ''
      setValidated(false); // Reset validated state on close
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || check === "block") {
      event.preventDefault();
      event.stopPropagation();
    } else {
      registereUser();
      event.preventDefault();
      event.stopPropagation();
      handleClose();
    }

    setValidated(true);
  };

  const [check, setCheck] = useState("none");
  const [isValid, setIsValid] = useState(false);

  const checkMatch = () => {
    if (confirm !== password) {
      setCheck("block"); // SHOW THE DIV OF FEEDBACK MSG
      setIsValid(true); //border color red with !
    } else {
      setCheck("none"); // hide the div msg
      setIsValid(false); // hide the red border and !
    }
  }; // end checkMatch


  return (
    <>
      <a onClick={handleShow}>
        Register User
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register New User</Modal.Title>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a Password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                autoFocus
                value={confirm}
                isInvalid={isValid}
                onBlur={() => checkMatch()}
                onChange={(e) => {
                  // alert(e.target.value)
                  setConfirm(e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

              <Form.Control.Feedback style={{ display: check }} type="invalid">
                Please Make sure Password is matched.
              </Form.Control.Feedback>
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

export default RegisterUser;
