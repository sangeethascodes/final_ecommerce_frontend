import React, {useEffect} from 'react';
import {Row,Col} from 'react-bootstrap'
import ProductScreens from './screens/ProductScreens'
// import axios from 'axios'
import { listProducts } from '../actions/ProductAction';
import { useDispatch,useSelector } from "react-redux";
import Loader from '../components/Loader'
import Message from '../components/Message'

function Home(){

    const dispatch=useDispatch()
    const productsList = useSelector((state)=>state.productsList)
    const {error,loading,products}=productsList

    useEffect(()=>{
       dispatch(listProducts())
    },[dispatch])

    

    return(
        <>
            <div>
                <h1 className="text-center mt-2">Latest Products</h1>

                {loading ? (<Loader/>)
                : 
                error ? (<Message variant='danger'>{error}</Message>)
                :
                (
                    <Row>
                     {products.map((product) =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                             {/* <h3>{product.name}</h3>  */}
                             <ProductScreens product={product}/>
                        </Col> 
                     ))} 
                </Row>
                )
                }
                
            </div>
        </>
    )
}

export default Home