import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../actions/userAction";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const [message, setMessage] = useState('')

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const handleClose=()=>setMessage(false)

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    validateField(name, value);
  };

  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";
    return formErrors[name] ? "is-invalid" : "is-valid";
  };

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every(
        (value) => value !== "" && value !== false,
      )
    );
  };

  const validateField = (name, value) => {
    let errorMessage = null;

    switch (name) {
      case "email":
        if (!value.trim()) {
          errorMessage = "Enter your email or username";
        }
        break;

      case "password":
        if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });

  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formValues.email, formValues.password));
  };

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>

          {loading ? (
            <Loader />
          ) : (
            <Col md="6">
              <Form onSubmit={submitHandler}>
                <br />

                <h1 className="text-center">Login here</h1>

                {message && <Message variant='success' onClose={handleClose}>{message}</Message>}

                {error && (
                  <Message variant={"danger"} onClose={handleClose}>
                    {error}
                  </Message>
                )}
                <Form.Group className="mt-3" controlId="email">
                  <Form.Label>Email or username</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                    placeholder="Enter your email address"
                    className={getValidationClass("email")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3" controlId="pass1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formValues.password}
                    isInvalid={!!formErrors.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={getValidationClass("password")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="btn btn-success mt-3"
                  variant="success"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  Login
                </Button>

                <div className="form-group" for="name"></div>
              </Form>
              <Row className="py-3">
                <Col>
                  New User?
                  <Link to="/signup">Signup</Link>
                </Col>
              </Row>
            </Col>
          )}
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
