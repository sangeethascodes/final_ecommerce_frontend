import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Badge,
} from "react-bootstrap";
import Message from "../Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function CartScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search
    ? Number(new URLSearchParams(location.search).get("qty") || 1)
    : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart) || {};
  const cartItems = cart.cartItems || [];

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  return (
    <>
      <Row>
        <Col md={8}>
          <Container>
            <h1 className="mt-3">Cart Items</h1>
            {cartItems.length === 0 ? (
              <Message variant="info">
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>

                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col md={2}>Rs {item.price}</Col>

                      <Col md={1}>
                        <Badge bg="secondary"> Qty: {item.qty}</Badge>
                      </Col>

                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Container>
        </Col>

        <Col md={4}>
          <Card className="mt-3">
            <ListGroup variant="flush">
              <ListGroup.Item className="mt-4">
                <h6>Total Quantity ({totalQuantity}) items</h6>
                <hr />
                <strong>Rs. {totalPrice}</strong>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block btn-success mt-3"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;
