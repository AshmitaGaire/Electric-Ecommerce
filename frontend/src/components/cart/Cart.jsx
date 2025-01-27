import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles"; // Importing custom styles
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

// Cart component
// Cart component
const Cart = ({ setOpenCart }) => {
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 overflow-y-auto">
      <div className="fixed top-0 right-0 min-h-full w-[50%] sm:w-[25%]  bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5> Cart Items is Empty</h5>
          </div>
        ) : (
          <>
            <div>
              {/* Close button */}
              <div className="relative">
                <div className="flex justify-end pt-5 pr-5 absolute top-0 right-0">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                  />
                </div>
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {" "}
                  {cart && cart.length} items
                </h5>
              </div>
              {/* Cart items */}
              <br />
              <div className="w-full border-t" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            {/* Checkout button */}
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


// CartSingle component
// CartSingle component
const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty); // State for quantity
  const totalPrice = data.discountPrice * value; // Calculate total price

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("PRODUCT STOCK LIMITED");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b border-gray-500 p-4 relative flex flex-col"> {/* Change to flex column layout */}
      <div className="w-full flex items-center justify-between"> {/* Change to flex layout */}
        <div className="flex items-center"> {/* Change to flex layout */}
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px] pr-[0]]">{data.qty}</span>

          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer "
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-6 rounded-[5px]"
        />
      </div>
      <div className="w-full flex items-center justify-between"> {/* Change to flex layout */}
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div className="flex items-center"> {/* Change to flex layout */}
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};


export default Cart;
