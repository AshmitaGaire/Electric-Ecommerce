import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.carts.cart);
  const wishlist = useSelector((state) => state.wishlists.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar
  // console.log(allProducts)
  console.log("this is cart", cart);
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchTerm("");
      setSearchData(null);
    }
    if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("user", user, "isAuthenticated", isAuthenticated);
  return (
    <>
      {/* Desktop header */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className="px-2 flex items-center">
            <div>
              <Link to="/">
                <div className="flex items-center">
                  <img
                    src="https://banner2.cleanpng.com/20180920/oav/kisspng-george-washington-university-george-washington-col-washington-capitals-new-logo-image-washington-capi-5ba40c7ff1b043.10787313153747775999.jpg"
                    alt="logo"
                    className="w-10 h-10 mr-2"
                    href="/"
                  />
                  <div className="text-4xl font-bold mr-2">
                    <span
                      className="text-3xl"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #2e4090, #00008B)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                      href="/"
                    >
                      GADGET
                    </span>
                  </div>
                  <div className="text-4xl font-bold font-pacifico">
                    <span
                      className="text-3xl"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #2e4090, #0000CD)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      WORLD
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* search box */}
          <div className="w-[50%] relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#2e4090] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i) => {
                  return (
                    <Link key={i.id} to={`/product/${i._id}`}>
                      <div className="w-full flex items-start-py-3">
                        {/* Serch bar dynamic */}
                        <img
                          src={`${backend_url}${i.images[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          {/* Become Seller box */}
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#f6f4f4] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* NAV BAR */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#191445] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)} ref={categoriesRef}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                Explore All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* Cart popup */}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {/* WishList popup */}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* Mobile header */}

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between ">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <div className="flex items-center">
                <img
                  src="https://banner2.cleanpng.com/20180920/oav/kisspng-george-washington-university-george-washington-col-washington-capitals-new-logo-image-washington-capi-5ba40c7ff1b043.10787313153747775999.jpg"
                  alt="logo"
                  className="w-10 h-10 mr-2"
                />
              </div>
            </Link>
          </div>
          {/* Cart icon */}
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(!openCart)}
              // Open the cart when clicked
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>

          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/* Header sidebar */}
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
          <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10">
            <div className="w-full justify-between flex pr-3">
              <div
                className="relative mr-[15px]"
                onClick={() => setOpenWishlist(true) || setOpen(false)}
              >
                <div className="relative mr-[15px]">
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    1
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px]">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#2e4090] border-[2px] rounded-md"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData.map((product) => {
                    const productSlug = product.name
                      .replace(/\s+/g, "-")
                      .toLowerCase();
                    return (
                      <Link key={product.id} to={`/product/${productSlug}`}>
                        <div className="flex items-center my-2">
                          <img
                            src={product.image_Url[0].url}
                            alt={product.name}
                            className="w-[50px] mr-2"
                          />
                          <h5>{product.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <Navbar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/shop-create">
                <h1 className="text-[#f6f4f4] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />

            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <div>
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login /
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
