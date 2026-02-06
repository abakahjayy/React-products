import {  useEffect, useState } from "react";
import { useFetchOnePro } from "../utils/hooks/useFetchOnePro";
import { DeliveryOptions } from "./DeliveryOptions";
// import { CartContext } from "../utils/contexts/CartContext";
// import { ProductContext } from "../utils/contexts/ProductContext";
import dayJs from 'dayjs';
import PropTypes from "prop-types";
import { FormatCurrency } from "../utils/hooks/useFormatCurrency";
import { useFetchDelivery } from "../utils/hooks/useFetchDelivery";
import { useDates } from "../utils/hooks/useDates";
const apiUrl = import.meta.env.VITE_API_URL
// const today = new dayJs();

export function OrderSummary({pro,setRefresh}) {
    const[data,setData]=useState({})//This is for the products in the cart
    const[datas,setDatas]=useState({})//This is for the delivery options in the cart
    const[days,setDays]=useState({})//This is for the delivery options in the cart


    // const {cart}=useContext(CartContext)
    // const {products}=useContext(ProductContext)
    // console.log(products)
    // console.log(cart.products)
    // console.log(pro)



    //This is for the products in the cart
    const {userData,loading,error} = useFetchOnePro(pro.productId)
    useEffect(() =>{
            if(!error&& userData.nbHits && !loading){
                setData(userData)
                // data.nbHits&&console.log(data);
            }
        },[error,loading,userData,data])


    //This is for the delivery Options
    const {userDatas,loadings,errors} = useFetchDelivery()
    useEffect(() =>{
            if(!errors&& userDatas.nbHits && !loadings){
                setDatas(userDatas)
                // datas.nbHits&&console.log(datas);
            }
        },[errors,loadings,userDatas,datas])



    const product = data;
    const delivery= datas;
    const today = dayJs();
    // console.log(pro)
    const mer =useDates(pro)
    // mer.data.nbHits&&console.log(mer.data.delivery.deliveryDays)
    useEffect(() =>{
        if(mer.data.nbHits){
            setDays(mer.data.delivery.deliveryDays)
            // days&&console.log(days);
        }
    },[mer,days])
    // if(delivery.deliveryOptionId === pro.deliveryOptionId){
        
    // }
    const deliveryDate = today.add(days,'days');
    //Setting up the time in front end
    const dateString = deliveryDate.format('ddd, D MMMM YYYY');

    //Loading the date ordered from the backend
    // const dateStrings = dayJs(pro.dateOrdered).format('ddd, D MMMM YYYY');// Order time,This code sends it back to dayjs original format with date in the variable orderTime
    // console.log(dateString);


    // userData.product&&console.log(product)
    // console.log(pro)


    function ChangeQuantity(){
        const quantity = Number(document.querySelector(`.quantity-input-${pro.productId}`).value);
        if(quantity<=0){
            return;
        }
        const asyncFetch = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/cart/677d11f3fbb51c2146710501/${pro.productId}/${quantity}`, {

                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(`There is an error: ${error.message}`)
            }
        };
        asyncFetch();//Async Wrapper
        const link=document.querySelector(`.link-${pro.productId}`)
        // eslint-disable-next-line no-unused-vars
        let idea;
        document.querySelectorAll(`.save-quantity-link-${pro.productId}`).forEach((show)=>{
            show.classList.add("see");
            idea=setTimeout(()=>{
                if(show.classList!=="see"){
                    show.classList.remove("see");
                    link.classList.remove("hide");
                }else console.warn("Could you not");
            },1);
            
        });

        console.log(quantity)
    }

    function DeleteProduct(){
        const asyncFetch = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/cart/677d11f3fbb51c2146710501/${pro.productId}/`, {

                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(`There is an error: ${error.message}`)
            }
        };
        asyncFetch();//Async Wrapper
    }




    return <>
        <div className="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div className="delivery-date">
                Delivery date: {dateString}
            </div>
            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={data.nbHits&&product.product.image}
                    alt={data.nbHits&&product.product.keywords[0]}
                    />
                <div className="cart-item-details">
                    <div className="product-name">
                        {/* ${matchingProduct.name} */}
                        {data.nbHits&&product.product.name}
                    </div>
                    <div className="product-price">
                        {/* ${matchingProduct.getPrice()} */}
                        ${data.nbHits&&FormatCurrency(product.product.priceCents)}
                    </div>
                    <div className="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                            Quantity:<span className="quantity-label quantity-label-${matchingProduct.id}">
                                            {pro.quantity}
                                    </span>
                        </span>
                        <span className={`update-quantity-link link-primary link-${pro.productId}`} data-product-id={`${pro.productId}`} onClick={(e)=>{
                            let idea;
                            const link = e.target;
                            const productId = pro.productId;
                            // const container = document.querySelector(`.js-cart-item-container-${productId}`);
                            link.classList.add('hide');
                            document.querySelectorAll(`.save-quantity-link-${productId}`).forEach((show)=>{
                                show.classList.add("see");
                                idea=setTimeout(()=>{
                                    if(show.classList!=="see"){
                                        show.classList.remove("see");
                                        link.classList.remove("hide");
                                    }else console.warn("Error in the update listeners");
                                },10000);
                                
                            });
                            console.log(idea)
                        }}>
                            Update
                        </span>
                        <input className={`quantity-input  save-quantity-link  save-quantity-link-${pro.productId} quantity-input-${pro.productId}`} data-product-id={`${pro.productId}`} onKeyDown={(event)=>{
                            if (event.key==='Enter') {
                                ChangeQuantity()
                            };
                        }}/>
                        <span className={`save-quantity-link  link-primary save-quantity-link-${pro.productId}  saving`} data-product-id={`${pro.productId}`} onClick={()=>{
                            ChangeQuantity()
                        }}>
                            Save
                        </span>
                        <span className={`delete-quantity-link link-primary delete-link-${pro.productId}`} data-product-id={`${pro.productId}`} onClick={()=>{
                            DeleteProduct()
                        }}>
                            Delete
                        </span>

                    </div>
                </div>
                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    {/* {deliveryOptionsHTML(matchingProduct, cartItem)} */}
                    {datas.nbHits&&delivery.deliverys.map((delivery)=>{
                        return <DeliveryOptions
                        key={delivery._id} delivery={delivery} pro={pro} setRefresh={setRefresh}
                        />})}
                </div>
            </div>
        </div>
    </>
}

OrderSummary.propTypes = {
    pro: PropTypes.object.isRequired,
    setRefresh: PropTypes.func.isRequired
}