import React from "react";
import "./Start.css";
import s from "../Assets/s.png";
import s1 from "../Assets/s1.png";
import s2 from "../Assets/s2.png";

function Start() {
  return (
    <div className="start_main_bg">
      <div className="container">
        <div className="section-header--middle">
          <div className="header--middle__content">
            <div className="title_bar">
              <h2 className="team_h2 text-white text-capitalize"> About USD Split & Bot Trade</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-lg-4  start">
            <div>
              <img src={s} alt="" className="sh_img" />
            </div>
            <h4 className="beni_h4 sh">Code is Law</h4>
            {/* <p className="text-white">Total supply of USBT.SPACE 21,00,000.</p> */}
          </div>
          <div className="col-lg-4 start">
            <div>
              <img src={s1} alt="" className="sh_img" />
            </div>
            <h4 className="beni_h4 sh">Smart Contract Based</h4>
            <p className="text-white">
              {/* Circulatin supply of USBT.SPACE 60,000 (upto October 2022). */}
            </p>
          </div>
          <div className="col-lg-4 start">
            <div>
              <img src={s2} alt="" className="sh_img" />
            </div>
            <h4 className="beni_h4 sh">100% Safe</h4>
            {/* <p className="text-white">Lock supply of USBT.SPACE 20,40,000.</p> */}
          </div>
          {/* <div className="col-lg-3 start">
            <div>
              <img src={s2} alt="" className="sh_img" />
            </div>
            <h4 className="beni_h4 sh">100% Safe</h4>
            <p className="text-white">Lock supply of USBT.SPACE 20,40,000.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Start;
