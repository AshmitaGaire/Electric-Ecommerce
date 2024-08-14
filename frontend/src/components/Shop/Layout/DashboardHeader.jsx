import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <div className="flex items-center">
            <img
              src="https://banner2.cleanpng.com/20180920/oav/kisspng-george-washington-university-george-washington-col-washington-capitals-new-logo-image-washington-capi-5ba40c7ff1b043.10787313153747775999.jpg"
              alt="logo"
              className="w-10 h-10 mr-2"
            />
            <div className="text-4xl font-bold mr-2">
              <span
                className="text-4xl"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #2e4090, #00008B)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                GADGET
              </span>
            </div>
            <div className="text-4xl font-bold font-pacifico">
              <span
                className="text-4xl"
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
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller ? seller._id : ""}`}>
            <img
              src={`${backend_url}${
                seller && seller.avatar ? seller.avatar : ""
              }`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        
        </div>
        
      </div>
    </div>
  );
};

export default DashboardHeader;
