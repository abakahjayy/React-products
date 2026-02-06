import dayJs from 'dayjs';
import PropTypes from "prop-types";
import { FormatCurrency } from "../utils/hooks/useFormatCurrency";
// import { FaTimes,FaHandLizard } from 'react-icons/fa';
const apiUrl = import.meta.env.VITE_API_URL




// import { ChangeDel } from '../utils/raw/ChangeDel.jsx';
const today = new dayJs();
export function DeliveryOptions({delivery,pro,setRefresh}){
    // console.log(pro)
    const priceString = delivery.priceCents
            ===0
                ? 'FREE'//This code will run if the condition above is true
                : `$${FormatCurrency(delivery.priceCents)} -`; //This code will run if the condition above is false

    const deliveryDate = today.add(delivery.deliveryDays,'days');
    const dateString = deliveryDate.format('ddd, D MMMM YYYY');

    let IsChecked = delivery.deliveryOptionId === pro.deliveryOptionId;
    // console.log(IsChecked)
    // ChangeDel(pro.productId,delivery.deliveryOptionId)
    return <>
            <div className="delivery-option"
            // data-product-id={matchingProduct.id} data-delivery-option-id={deliveryOption.id}
            >
                <input type="radio"
                checked={IsChecked}
                className="delivery-option-input"
                name={`delivery-option-${pro._id}`} value={delivery.deliveryOptionId} onChange={(e)=>{
                    // IsChecked=true;
                    // e.target.checked=true;
                    // console.log(e.target.checked);
                    console.log(e.target.value)
                    console.log(delivery.deliveryOptionId)
                    setRefresh(true);
                    // console.log(refresh);
                    const asyncFetch =async() =>{
                        try{
                            const response =await fetch(`${apiUrl}api/v1/changedel/677d11f3fbb51c2146710501/${pro.productId}/${e.target.value}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                            })
                            const data = await response.json();
                            console.log(data.cart.products)
                        }catch(error){
                            console.log(`There is an error: ${error.message}`)
                        }
                        // IsChecked = true;
                    };
                    asyncFetch();//Async Wrapper
                    // <DeliveryOptions pro={pro} delivery={delivery}/>
                    // ChangeDel(pro.productId,delivery.deliveryOptionId)
                }
                    }/>
                <div>
                    <div className="delivery-option-date">
                        {dateString}
                    </div>
                    <div className="delivery-option-price">
                        {priceString}  Shipping
                    </div>
                </div>
            </div>
        </>
}

DeliveryOptions.propTypes = {
    delivery: PropTypes.object.isRequired,
    pro: PropTypes.object.isRequired,
    setRefresh: PropTypes.func.isRequired,
}