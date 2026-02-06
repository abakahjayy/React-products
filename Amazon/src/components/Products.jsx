import PropTypes from "prop-types";
import dayJs from "dayjs";
const today=new dayJs();
const date=today.format('ddd, D MMMM YYYY');
const apiUrl = import.meta.env.VITE_API_URL

export function Products({ product }) {
    return <>
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image" src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars" src={product.getStarsUrl()} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {product.getPrice()}
            </div>

            <div className="product-quantity-container">
                <select className={`js-quantity-selector-${product.id}`}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>
            {product.extraInfoHTML()}
            <div className={`added-to-cart added-to-cart-${product.id}`}>
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary js-add-to-cart" data-product-id={product.id} onClick={() => {
                const quany=Number(document.querySelector(`.js-quantity-selector-${product.id}`).value);
                console.log(quany)
                const asyncFetch = async () => {
                    try {
                        const response = await fetch(`${apiUrl}/api/v1/cart/677d11f3fbb51c2146710501`, {

                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                    "products":
                                        [{ "productId": product.id, "deliveryOptionId": "1", "dateOrdered": date, "quantity": quany }]
                            })
                        })
                        const data = await response.json();
                        console.log(data);
                    } catch (error) {
                        console.log(`There is an error: ${error.message}`)
                    }
                };
                asyncFetch();//Async Wrapper

                let timeoutId;
                document.querySelector(`.added-to-cart-${product.id}`).classList.add('added');//You can use back-ticks to insert a value
                if (timeoutId) {
                    clearTimeout(timeoutId); // If the timeoutId is already set, clear it .
                }
                timeoutId = setTimeout(()=>{//This code is used to show the added message for only 2 seconds
                    document.querySelector(`.added-to-cart-${product.id}`).classList.remove('added');
                },2000);
            }}>
                Add to Cart
            </button>
        </div>
    </>
}

Products.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string.isRequired,
        rating: PropTypes.object,
        extraInfoHTML: PropTypes.func.isRequired,
        getPrice: PropTypes.func.isRequired,
        getStarsUrl: PropTypes.func.isRequired,
    }).isRequired,
}