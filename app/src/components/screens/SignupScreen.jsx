import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { signup } from "../../actions/userAction";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { Link } from "react-router-dom"



function SignupScreen() {
  const dispatch = useDispatch()
  const [message,setMessage] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)

  const userSignup = useSelector((state)=>state.userSignup)
  const handleClose =()=> setMessage(false)
  const {error,loading,userInfo} = userSignup

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmpassword: null,
    termAccepted: null,
  });

  const handleChange =(e)=> {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
    validateField(name,newValue)
  };

  const getValidationClass =(name)=>{
    if(formValues[name]==="") return ""
    return formErrors[name] ? "is-invalid" : "is-valid"
    
  }

  const clearForm =()=>{
    setFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      termAccepted: false,
    })
  }


  const isFormValid=()=>{
    return Object.values(formErrors).every((error)=>error===null) &&
           Object.values(formValues).every((value)=>value!=="" && value!==false)
  }

  const validateField =(name,value)=>{
    let errorMessage=null

    switch(name){

        case "firstname":
        case"lastname":
            if(!value){
                errorMessage="This field is required..."
            }
            break;

        case "email":
            const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(value)){
                errorMessage="Invalid email format..."
            }
            break;

        case "password":
          const minLength=6
          const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).{6,}$/;
            if(value.length<minLength || !passwordRegex.test(value)){
                errorMessage="Password must be at least 6 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
            }
            break
        
        case "confirmpassword":
            if(value!==formValues.password){
                errorMessage="Password do not match..."
            }
            break

        case "termAccepted":
            if(!value){
                errorMessage="You must accept the term and conditions..."
            }
            break

        default:
            break
        
    }

    setFormErrors({
        ...formErrors,
        [name]:errorMessage
    })

  }

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(signup(formValues.firstname,formValues.lastname,formValues.email,formValues.password))
    clearForm()
  }

  useEffect(()=>{
    if(userInfo){
      setMessage(userInfo["details"])
    }
  },[userInfo])



  return (
    <>
      <Container>
        <Row>
          <Col md="3"></Col>

            {loading ? (<Loader/>)
            : 
                        
            (              
            <Col md="6">
            <Form onSubmit={submitHandler}>
              <br />
              <h1 className="text-center">Signup here</h1>
              {message && <Message variant={'success'} onClose={handleClose}>{message}</Message>}
              {error && <Message variant={'danger'} onClose={handleClose}>{error}</Message>}
              <Form.Group className="mt-3" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={formValues.firstname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.firstname}
                  placeholder="Enter your first name"
                  className={getValidationClass('firstname')}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    {formErrors.firstname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastname" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={formValues.lastname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.lastname}
                  placeholder="Enter your last name"
                  className={getValidationClass('lastname')}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    {formErrors.lastname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  isInvalid={!!formErrors.email}
                  placeholder="Enter your email address"
                  className={getValidationClass('email')}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>



              <Form.Group className="mb-3">
                <Form.Label>
                  {" "}
                  Password
                </Form.Label>
                <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Show passwords"
                  checked={passwordVisible}
                  onChange={() => setPasswordVisible((visible) => !visible)}
                />

                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="pass1"
                  value={formValues.password}
                  isInvalid={!!formErrors.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={getValidationClass('password')}
                />
                 <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


                <Form.Group className="mb-3">
                <Form.Label>
                  {" "}
                  Confirm Password
                </Form.Label>
                <InputGroup className="mb-3">

                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="confirmpassword"
                  id="pass2"
                  value={formValues.confirmpassword}
                  isInvalid={!!formErrors.confirmpassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={getValidationClass('confirmpassword')}
                />
                 <Form.Control.Feedback type="invalid">
                    {formErrors.confirmpassword}
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {/* <Form.Group className="mt-3" controlId="pass2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  value={formValues.confirmpassword}
                  onChange={handleChange}
                  isInvalid={!!formErrors.password}
                  placeholder="Confirm Password"
                  className={getValidationClass('confirmpassword')}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    {formErrors.confirmpassword}
                </Form.Control.Feedback>
              </Form.Group> */}

            
              <Form.Group className="mt-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting"
                  name="termAccepted"
                  checked={formValues.termAccepted}
                  value={formValues.termAccepted}
                  className={getValidationClass('termAccepted')}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.termAccepted}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="btn btn-success mt-3" variant="success" type='submit' disabled={!isFormValid()}>
                Signup
              </Button>
            </Form>

            <Row className="py-3">
                <Col>
                  Already User?
                  <Link to="/login">Login In</Link>
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

export default SignupScreen;
