import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantityInCart,
  increaseQuantityInCart,
  removeItemFromCart,
} from "../../../redux/actions/cartAction";
import { CartWrapper } from "./cartStyle";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "../../../assets/images/emptyCart.gif";
import MetaData from "../../MetaData";

function MyCart() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let totalAmt = 0;
  cartItems.forEach((element) => {
    totalAmt += element.price * element.quantity;
  });
  totalAmt = Math.round(totalAmt * 100) / 100;

  return (
    <>
      <MetaData title="cart" />
      {cartItems.length === 0 ? (
        <div
          style={{
            width: "100vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "#fcfcfc",
          }}
        >
          <img alt="cart " width="200px" height="200px" src={emptyCart} />
          <h1>No Items in cart</h1>
          <Link
            to="/products"
            className="shopNowBtn"
            style={{
              padding: "10px 20px",
              background: "orange",
              textDecoration: "none",
              fontSize: "1.3rem",
              fontWeight: "700",
              fontFamily: "roboto",
              color: "black",
              margin: "10px 0",
            }}
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <CartWrapper>
          <div className="ProductsWrapper">
            {cartItems.map((item) => {
              return (
                <div key={item.product} class="productCard">
                  <img src={item.image} alt={item.title} />
                  <div className="card">
                    <div className="productDes">
                      <h2 className="cardTitle">{item.name}</h2>
                      <h3 className="productPrice amount">
                        <label>Price : </label>₹ {item.price}
                      </h3>
                    </div>
                    <div className="quantityContainer">
                      <label>Quantity</label>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantityInCart(item.product))
                        }
                      >
                        +
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantityInCart(item.product))
                        }
                      >
                        -
                      </button>
                    </div>

                    <button
                      className="removeBtn"
                      onClick={() => dispatch(removeItemFromCart(item.product))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="totalAmtWrapper">
            <div className="totalAmtContainer">
              <div className="totalDes">
                <h5 className="totalItem">Total Items: {cartItems.length}</h5>
                <h3 className="totalAmt amount">₹ {totalAmt}</h3>
              </div>
              <div className="checkoutWrapper">
                <button
                  className="checkoutBtn"
                  onClick={() => navigate("/shipping")}
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </CartWrapper>
      )}
    </>
  );
}

export default MyCart;
