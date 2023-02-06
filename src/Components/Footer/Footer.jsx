import React from "react";
import "./Footer.css";
import LOGO1 from "../Assets/LOGO2.png";
import LOGO2 from "../Assets/teligram.jpg";

function Footer() {
  return (
    <div className="footer_main_bg">
      <div className="inner_footer">
        <div className="container">
          <div className="footer_img">
            <a href="#" className="footer_img_ml">
              <img src={LOGO1} className="www" alt="" />
            </a>
          </div>
          <div className="social">
            {/* <a href="https://t.me/juttosmartgame" className="footer_img_ml"> */}
            <a href="#" className="footer_img_ml" alt="">
              <img src={LOGO2} className="www" id="img-ip-1" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer_copy">
        <div className="row justify-content-center py-4">
          <p className="footer_text">
            USBT.SPACE © {new Date().getFullYear()} | All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
