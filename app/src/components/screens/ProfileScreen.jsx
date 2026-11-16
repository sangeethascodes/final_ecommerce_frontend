import { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile } from '../../actions/userAction'
import { listMyOrders } from '../../actions/orderAction'
import { USER_PROFILE_UPDATE_RESET } from '../../constants/UserConstansts'
import Loader from '../Loader'
import Message from '../Message'

function ProfileScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.userLogin)
    const profileUpdate = useSelector((state) => state.userProfileUpdate)
    const { loading: updating, error: updateError, success } = profileUpdate
    const myOrderList = useSelector((state) => state.myOrderList)
    const { loading: loadingOrders, error: ordersError, orders } = myOrderList
    const userId = userInfo && userInfo.id
    const profileFirstName = userInfo && (userInfo.firstName || userInfo.name || '')
    const profileLastName = userInfo && (userInfo.lastName || '')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formError, setFormError] = useState('')
    const [saved, setSaved] = useState(false)
    const [updateErrorDismissed, setUpdateErrorDismissed] = useState(false)
    const [ordersErrorDismissed, setOrdersErrorDismissed] = useState(false)

    useEffect(() => {
        if (!userId) {
            navigate('/login?redirect=/profile')
        }
    }, [navigate, userId])

    useEffect(() => {
        if (userId) {
            setFirstName(profileFirstName)
            setLastName(profileLastName)
            dispatch(listMyOrders())
        }
    }, [dispatch, profileFirstName, profileLastName, userId])

    useEffect(() => {
        setOrdersErrorDismissed(false)
    }, [ordersError])

    useEffect(() => {
        if (success) {
            setPassword('')
            setConfirmPassword('')
            setSaved(true)
            dispatch({ type: USER_PROFILE_UPDATE_RESET })
        }
    }, [dispatch, success])

    const submitHandler = (event) => {
        event.preventDefault()
        setSaved(false)
        setFormError('')
        setUpdateErrorDismissed(false)

        if (!firstName.trim() || !lastName.trim()) {
            setFormError('First name and last name are required.')
            return
        }
        if (password && password.length < 6) {
            setFormError('Password must be at least 6 characters.')
            return
        }
        if (password !== confirmPassword) {
            setFormError('Passwords do not match.')
            return
        }

        dispatch(updateUserProfile({ fname: firstName, lname: lastName, password }))
    }

    const closeMessage = () => setSaved(false)

    return (
        <div className='py-4'>
            <h1>My Account</h1>
            <Row className='g-4'>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title as='h2'>User Profile</Card.Title>
                            {saved && (
                                <Message variant='success' onClose={closeMessage}>
                                    Profile updated successfully.
                                </Message>
                            )}
                            {formError && (
                                <Message variant='danger' onClose={() => setFormError('')}>
                                    {formError}
                                </Message>
                            )}
                            {updateError && !updateErrorDismissed && (
                                <Message variant='danger' onClose={() => setUpdateErrorDismissed(true)}>
                                    {updateError}
                                </Message>
                            )}
                            <Form onSubmit={submitHandler}>
                                <Form.Group className='mb-3' controlId='profileFirstName'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required
                                        autoComplete='given-name'
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='profileLastName'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        required
                                        autoComplete='family-name'
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='profilePassword'>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder='Leave blank to keep your password'
                                        autoComplete='new-password'
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='profileConfirmPassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        placeholder='Confirm your new password'
                                        autoComplete='new-password'
                                    />
                                </Form.Group>
                                <Button type='submit' variant='primary' disabled={updating}>
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </Button>
                                {updating && <Loader />}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title as='h2'>My Orders</Card.Title>
                            {loadingOrders ? (
                                <Loader />
                            ) : ordersError && !ordersErrorDismissed ? (
                                <Message variant='danger' onClose={() => setOrdersErrorDismissed(true)}>
                                    {ordersError}
                                </Message>
                            ) : orders.length === 0 ? (
                                <p className='text-muted mb-0'>You have not placed any orders yet.</p>
                            ) : (
                                <Table striped bordered hover responsive className='table-sm mb-0'>
                                    <thead>
                                        <tr>
                                            <th>ORDER ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>QTY</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => {
                                            const quantity = (order.orderItems || []).reduce(
                                                (total, item) => total + Number(item.qty || 0),
                                                0
                                            )
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                                                    <td>Rs. {order.totalPrice}</td>
                                                    <td>{quantity}</td>
                                                    <td>
                                                        <Badge bg={order.isPaid ? 'success' : 'secondary'}>
                                                            {order.isPaid ? 'Yes' : 'No'}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Badge bg={order.isDelivered ? 'success' : 'secondary'}>
                                                            {order.isDelivered ? 'Yes' : 'No'}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant='light'
                                                            size='sm'
                                                            onClick={() => navigate(`/order/${order._id}`)}
                                                        >
                                                            DETAILS
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProfileScreen
