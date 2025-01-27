import React from 'react'
import styles from '../styles/styles.js'
import ShopInfo from "../components/Shop/ShopInfo.jsx";
import ShopProfileData from "../components/Shop/ShopProfileData.jsx";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll  h-[95vh] sticky top-10 left-0 z-10 scrollbar-none">
            <ShopInfo isOwner={true} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={true} />
          </div>
         </div>
    </div>
  )
}

export default ShopHomePage