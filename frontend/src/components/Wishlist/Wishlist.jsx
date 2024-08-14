import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus, BsX } from "react-icons/bs"; // Changed import
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { RxCross1 } from "react-icons/rx";
import { backend_url } from "../../server";
import { addTocart } from "../../redux/actions/cart";

// Wishlist component
const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlists);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 }
    dispatch(addTocart(newData))
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 overflow-y-auto">
      <div className="fixed top-0 right-0 min-h-full w-[50%] sm:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5> Wishlist Items is Empty</h5>
          </div>
        ) : (
          <>
            <div>
              {/* Close button */}
              <div className="flex w-full justify-end pt-5 pr-5">
                <BsX // Changed icon
                  size={40}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>
              {/* Cart items */}
              <br />
              <div className="w-full border-t" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                {wishlist &&
                  wishlist.map((i, index) => {
                    return <WishlistSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />;
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// WishlistSingle component
const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = React.useState(1); // State for quantity
  const totalPrice = data.discountPrice * value; // Calculate total price

  return (
    <div className="border-b p-4 relative"> {/* Add relative positioning to the container */}
      <div className="w-full flex items-center ">
        <RxCross1 className=" absolute left-0 cursor-pointer" onClick={() => removeFromWishlistHandler(data)} /> {/* Cross icon */}
        <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        {/* Product details */}
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div className="absolute  right-0"> {/* Add absolute positioning to fix position */}
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => {
              addToCartHandler(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
