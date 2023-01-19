import React from 'react'
import "./Homef.css"
import hf from "../Assets/hf.png"
function Homef() {
  return (
    <div className='homef_main'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className='homef_h1'>
              JUTTO smart game (JSG)<br></br>A new revolution in blockchain techenology. <br /> <br /></h1>
            <p className='homef_p' style={{ textAlign: "justify " }}> Jutto smart game (JSG) is a smart contract which is based on BEP20 blockchain, smart contracts are typically a collection of codes and data, computer program or transaction protocols. A smart contract is a decentralized application store in a specific address on a blockchain that excutes itself when pre-determined terms & conditions are met. </p>
          </div>
          <div className="col-lg-6">
            <div className='ani'>
              <img src={hf} className='home_f_img' alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homef
