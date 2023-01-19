import React from 'react'
import "./Start.css"
import s from "../Assets/s.png"
import s1 from "../Assets/s1.png"
import s2 from "../Assets/s2.png"
import s4 from "../Assets/s4 .jpeg"
import s5 from "../Assets/s5.jpeg"

function Start() {
  return (
    <div className='start_main_bg'>
      <div className="container">
        <div className='section-header--middle'>
          <div className="header--middle__content">
            <div className="title_bar">
              <h2 className='team_h2 text-white'>ABOUT JUTTO TOKEN</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row ">
          <div className="col-lg-4  start">
            <div>
              <img src={s} alt="" className='sh_img' />
            </div>
            <h4 className='beni_h4 sh'>1.Suuply
            </h4>
            <p className='text-white'>Totally supply of JUTTO 21,00,000.</p>
          </div>
          <div className="col-lg-4 start">
            <div>
              <img src={s1} alt="" className='sh_img' />
            </div>
            <h4 className='beni_h4 sh'>2. Circulating Supply</h4>
            <p className='text-white'>Circulatin supplu of JUTTO 60,000 (upto October 2022).
            </p>
          </div>
          <div className="col-lg-4 start">
            <div>
              <img src={s2} alt="" className='sh_img' />
            </div>
            <h4 className='beni_h4 sh'>3. Lock supply
            </h4>
            <p className='text-white'>Lock supply of JUTTO 20,40,000.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start
