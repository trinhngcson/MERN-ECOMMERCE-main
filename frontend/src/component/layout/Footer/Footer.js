import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"
const Footer = () => {
  return (
    <footer id = "footer">
        <div className = "leftFooter">
            <h4>DOWNLOAD APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt = "playStore"/>
            <img src={appStore} alt = "appStore"/>
        </div>
        <div className = "midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quanlity is our first priority</p>
            <p>Copyrights 2022 &copy; TRINHNGOCSON</p>
        </div>
        <div className = "rightFooter">
            <h4>NOTHING HERE</h4>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.youtube.com/">Youtube</a>
            <a href="https://www.facebook.com/">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer