import React ,{useState,useEffect}from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

// import Razorpay from "razorpay";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRemoveItem = (id) => {
    try {
      let Mycart = [...cart];
      let index = Mycart.findIndex((item) => item.id === id);
      Mycart.splice(index, 1);
      setCart(Mycart);
      localStorage.setItem("cart", JSON.stringify(Mycart));
    } catch (error) {
      console.log(error);
    }
  };
  const TotalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/create/order',
        {
          amount: totalAmount,
          currency: "USD", // Pass USD explicitly
        }
      );

      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Replace with Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "E-Commerce",
        description: "Test Transaction",
        handler: function (response) {
          axios
            .post(
              'http://localhost:8080/api/v1/product/verify/payment/razorpay',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                cart,
              }
            )
            .then(function (response) {
              if (response.data.success) {
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Payment Successfull");
              } else {
                console.log("Payment verification failed!");
              }
            })
            .catch(function (error) {
              console.error("Error during verification:", error);
            });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

   

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        
        <div className="row">
          
          <div className="col-md-8">
          <div className="col-md-8">
            {Object.values(
              cart?.reduce((acc, p) => {
                // Group products by ID and sum up quantities
                if (!acc[p._id]) {
                  acc[p._id] = { ...p, quantity: 1 };
                } else {
                  acc[p._id].quantity += 1;
                }
                return acc;
              }, {})
            ).map((p) => (
              <div key={p._id} className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={p.photo}
                    className="card-img-top"
                    alt={p.name}
                    width="180px"
                    height="100px"
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 20)}</p>
                  <p>Price: {p.price}$</p>
                  <p>Quantity: {p.quantity}</p>
                  <div className="col-md-4 cart-remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(p._id)}
                  >
                    Remove
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          <div className="col-md-4 text-center cart-summary">
            <h4>Cart Summary</h4>
            <p>Total | CheckOut | Payment </p>
            <hr />
            <h4>Total : {TotalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.user?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login To Check-Out
                    </button>
                  )}
                </div>
              </>
            )}
            {!cart.length ? (
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Add Items
              </button>
            ) : (
              <div className="mt-2">
                <button className="btn btn-primary" onClick={createOrder}>
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;