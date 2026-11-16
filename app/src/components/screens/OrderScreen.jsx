import { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { getOrderDetails, deliverOrder } from '../../actions/orderAction'

function OrderScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, setMessage] = useState('')

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
            return
        }

        if (!order || order._id !== Number(id)) {
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, id, navigate, order, userInfo])

    useEffect(() => {
        if (successDeliver) {
            dispatch({ type: 'ORDER_DELIVER_RESET' })
        }
    }, [dispatch, successDeliver])

    if (!loading && !error && order) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
            .toFixed(2)
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const handleClose = () => setMessage('')

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger' onClose={handleClose}>{error}</Message>
    ) : (
        <div>
            <h1 className='mt-4'>Order ID: {id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong> {order.user && order.user.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${order.user && order.user.email}`}>{order.user && order.user.email}</a></p>
                            <p>
                                <strong>Shipping:</strong>{' '}
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success' onClose={handleClose}>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning' onClose={handleClose}>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <Message variant='success' onClose={handleClose}>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning' onClose={handleClose}>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant='info' onClose={handleClose}>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X Rs {item.price} = Rs {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>Rs {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
