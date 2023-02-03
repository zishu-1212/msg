import React from "react";
import "./Benifits.css";
import b from "../Assets/b.png";
import b1 from "../Assets/b1.png";
import b2 from "../Assets/b2.png";
import b3 from "../Assets/b3.png";
function Benifits() {
  return (
    <div className="benifits_main_bg">
      <div className="container">
        <div className="section-header--middle">
          <div className="header--middle__content">
            <div className="title_bar">
              <p className="team_para text-white"> Trade Rules</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <h5 className="text-white justify">
              5 days will be Added ineachcycle
            </h5>

            <p className="text-white justify">
              1: Everyone is qualifiedfor tier1income
            </p>
            <p className="text-white justify">
              2: All income will be Split intheratioof70% USDT &30%RIF A/c.
            </p>
            <p className="text-white justify">
              3: After 3 X of your Tradepackagethesplit ratio will be
              tochangeto70%RIF A/c & 30%USDT
            </p>
            <p className="text-white justify">
              4: Split Fund transfer will beminmum50$ & in multiple of 50$• USBT
              will launch its ownTokeninfuture as community growstodealwith any
              deficit of USDTinSmartContract .
            </p>
          </div>
          {/* <div className="col-lg-3">
            <div className="beni_img">
              <img src={b} alt="" />
            </div>
            <h4 className='beni_h4 '>Decentralization</h4>
            <p className='text-white justify'>Blockchain technology does not rely on additional
              third-party management agencies or hardware
              facilities, and there is no central control. Except for
              the self-contained blockchain itself, through
              distributed accounting and storage, each node
              realizes information self-verification, transmission
              and management. Decentralization is the most
              prominent and essential feature of blockchain.
            </p>
          </div>
          <div className="col-lg-3">
            <div className="beni_img">
              <img src={b1} alt="" />
            </div>
            <h4 className='beni_h4 '>Openness</h4>
            <p className='text-white justify'>The foundation of blockchain technology is open
              source. In addition to the encrypted private
              information of transaction parties, blockchain data is
              open to everyone. Anyone can query blockchain
              data and develop related applications through
              public interfaces. System information is highly
              transparent.</p>
          </div>
          <div className="col-lg-3">
            <div className="beni_img">
              <img src={b2} alt="" />
            </div>
            <h4 className='beni_h4'>Independence</h4>
            <p className='text-white justify'>Based on consensus specifications and protocols
              (similar to various mathematical algorithms such as
              the hash algorithm adopted by Bitcoin), the entire
              blockchain system does not rely on other third
              parties, and all nodes can automatically and
              securely verify and exchange data within the system
              without the need for any human intervention.
            </p>
          </div>
          <div className="col-lg-3">
            <div className="beni_img">
              <img src={b3} alt="" />
            </div>
            <h4 className='beni_h4'>Security</h4>
            <p className='text-white justify'>As long as 51% of all data nodes cannot be
              controlled, network data cannot be manipulated and
              modified arbitrarily, which makes the blockchain itself
              relatively safe and avoids subjective and artificial
              data changes.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Benifits;
