import React from "react";
import "./Homef.css";
import hf from "../Assets/V6.png";
function Homef() {
  return (
    <div className="homef_main">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* <h1 className="homef_h1">
              USBT.SPACE smart game (USG)<br></br>A new revolution in blockchain
              techenology. <br /> <br />
            </h1> */}
            <h6 className="homef_h1"> 
            A truly decentralized Smart Contract based never ending lifetime earning opportunity.
USBT works through a smart contract that is verified and deployed upon Binance Smartchain.
Once deployed no one can stop, alter, modify or delete it. It will run until community wants
it to run. All players will get their cycle awards for the lifetime.
            </h6>
            {/* <p className="homef_p" style={{ textAlign: "justify " }}>
              {" "}
              USBT.SPACE smart game (USG) is a smart contract which is based on
              BEP20 blockchain, smart contracts are typically a collection of
              codes and data, computer program or transaction protocols. A smart
              contract is a decentralized application store in a specific
              address on a blockchain that excutes itself when pre-determined
              terms & conditions are met.
            </p> */}
          </div>
          <div className="col-lg-6">
            <div className="ani">
              <img src={hf} className="home_f_img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homef;
