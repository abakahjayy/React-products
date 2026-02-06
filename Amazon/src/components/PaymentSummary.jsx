import PropTypes from "prop-types";
import { FormatCurrency } from '../utils/hooks/useFormatCurrency';
import { useAmountCalc } from "../utils/hooks/useAmountCalc";
import { useContext } from "react";
import { CartContext } from "../utils/contexts/CartContext";
import dayJs from "dayjs";
import {useNavigate} from "react-router-dom";//We use this Link instead to prevent the page from refreshing
const today = new dayJs();
const apiUrl = import.meta.env.VITE_API_URL
export function PaymentSummary({ quantity, totalCartCents }) {
    const navigate = useNavigate()
    const { shippingPriceCents, totalBeforeTaxCents, totalCents, taxCents } = useAmountCalc()
    // console.log(FormatCurrency(shippingPriceCents))
    // console.log(FormatCurrency(totalBeforeTaxCents))
    // console.log(FormatCurrency(totalCents))
    // console.log(FormatCurrency(taxCents))

    const { cart } = useContext(CartContext)
    // console.log(cart)


    function MakeOrder() {
        const asyncFetch = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/orders`, {

                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify([{
                        products:cart.products,totalCostCents: totalCents, orderTime: today.format('ddd, D MMMM YYYY')
                    }]
                    )
                })
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(`There is an error: ${error.message}`)
            }
        };
        asyncFetch();//Async Wrapper

        console.log(quantity)
    }


    function DeleteAllProduct(){
        const asyncFetch = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/changedel/677d11f3fbb51c2146710501/`, {

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
        <div className="payment-summary-title">
            Order Summary
        </div>
        <div className="payment-summary-row">
            <div className="items">Items({quantity}):</div>
            <div className="payment-summary-money">
                ${FormatCurrency(totalCartCents)}
            </div>
        </div>
        <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">$
                {FormatCurrency(shippingPriceCents)}
            </div>
        </div>
        <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">$
                {FormatCurrency(totalBeforeTaxCents)}
            </div>
        </div>
        <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
                {FormatCurrency(taxCents)}
            </div>
        </div>
        <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">$
                {FormatCurrency(totalCents)}
            </div>
        </div>
        <button className="place-order-button button-primary" onClick={() => {
            if (quantity <= 0) {
                return;
            }
            MakeOrder()
            DeleteAllProduct()
            navigate('/orders')
        }}>
            Place your order
        </button>
    </>
}

PaymentSummary.propTypes = {
    quantity: PropTypes.number.isRequired,
    totalCartCents: PropTypes.number.isRequired,
}