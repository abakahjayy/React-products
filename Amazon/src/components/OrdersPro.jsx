import PropTypes from "prop-types"
import { useFetchOnePro } from "../utils/hooks/useFetchOnePro"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import dayJs from "dayjs";
const today=new dayJs()
const date=today.format('ddd, D MMMM YYYY');
const apiUrl = import.meta.env.VITE_API_URL

export function OrdersPro({itemCart,orderId,orderTime}){
    const navigate = useNavigate()
    const[data,setData]=useState({})//This is for the products in the cart
    const {userData,loading,error}=useFetchOnePro(itemCart.productId)
    useEffect(() =>{
                if(!error&& userData.nbHits && !loading){
                    setData(userData)
                    // data.nbHits&&console.log(data);
                }
            },[error,loading,userData,data])
    const product = data;
    // data.product&&console.log(product.product);
    return <>
                <div className="product-image-container">
                    <img src={data.product&&product.product.image} alt=""/>
                </div>

                <div className="product-details">
                    <div className="product-name">
                        {data.product&&product.product.name}
                    </div>
                    <div className="product-delivery-date">
                        Arriving on: {itemCart.estimatedDeliveryTime}
                    </div>
                    <div className="product-quantity">
                        Quantity: {itemCart.quantity}
                    </div>
                    <button className="buy-again-button button-primary" data-product-id="${itemCart.id}" onClick={()=>{
                        const quany=1;
                        console.log(quany)
                        const asyncFetch = async () => {
                            try {
                                const response = await fetch(`${apiUrl}/api/v1/cart/677d11f3fbb51c2146710501`, {
        
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                            "products":
                                                [{ "productId": itemCart.productId, "deliveryOptionId": "1", "dateOrdered": date, "quantity": quany }]
                                    })
                                })
                                const data = await response.json();
                                console.log(data);
                            } catch (error) {
                                console.log(`There is an error: ${error.message}`)
                            }
                        };
                        asyncFetch();//Async Wrapper
                        navigate('/checkout')
                    }}>
                        <img className="buy-again-icon" src="images/icons/buy-again.png" alt=""/>
                        <span className="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div className="product-actions">
                    <a href={`/tracking?orderId=${orderId}&estimatedDeliveryTime=${itemCart.estimatedDeliveryTime}&productId=${itemCart.productId}&quantity=${itemCart.quantity}&orderTime=${orderTime}`}>
                        <button className="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            </>
}

OrdersPro.propTypes ={
    itemCart: PropTypes.object.isRequired,
    orderTime: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
}