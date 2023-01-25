import React, { useState, useEffect } from "react";
import LOGO1 from "../Assets/LOGO2.png";
import "./Stacking_top.css";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import jutto_token from "../Assets/jutto_token.pdf";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiMenu } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { IoCalendar } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import Main_stacking from "../Main_stacking/Main_stacking";
import Reward_info from "../Reward_info/Reward_info";
import My_team from "../My_team/My_team";
import Latest_Deposit from "../Latest_Deposit/Latest_Deposit";
import Deposit_details from "../Deposit_details/Deposit_details";
import { FaFolderMinus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions";

function Stacking_top() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  const [show, setShow] = useState(false);
  const [getAccount, setGetAccount] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [showwalleticon, setshowwalleticon] = useState(true);

  const onConnectAccount = () => {
    dispatch(connectionAction());
  };

  return (
    <>
      <div className="stacking_top">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between">
              <Link to="/">
                <img src={LOGO1} className="stackig_top_logo" alt="" />
              </Link>
              <div className="both_dev">
                <button className="stack_btn_s" onClick={onConnectAccount}>
                  {" "}
                  {acc === "No Wallet"
                    ? "Connect"
                    : acc === "Connect Wallet"
                    ? "Connect"
                    : acc === "Wrong Network"
                    ? acc
                    : acc.substring(0, 3) +
                      "..." +
                      acc.substring(acc.length - 3)}
                </button>

                <a className="user px-2" onClick={handleShow}>
                  <BiMenu />
                </a>
                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  placement="end"
                  responsive=""
                >
                  <Offcanvas.Header
                    className="bbbdy"
                    closeButton
                    closeVariant="white"
                  >
                    <Offcanvas.Title>
                      <h3></h3>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="bbbdy">
                    <Link to="/Dashboard/Home" onClick={handleClose}>
                      <div className="lenkk">
                        <MdOutlineDashboardCustomize className="iicon" />{" "}
                        <h3>Dashboard</h3>
                      </div>
                    </Link>
                    <Link to="/Dashboard/Latest_Deposit" onClick={handleClose}>
                      <div className="lenkk">
                        <IoPeople className="iicon" /> <h3>Latest Deposit</h3>
                      </div>
                    </Link>
                    <Link to="/Dashboard/Reward_info" onClick={handleClose}>
                      <div className="lenkk">
                        <IoCalendar className="iicon" /> <h3>Reward Info</h3>
                      </div>
                    </Link>

                    <Link to="/Dashboard/My_team" onClick={handleClose}>
                      <div className="lenkk">
                        <IoPeople className="iicon" /> <h3>My Team</h3>
                      </div>
                    </Link>
                    <Link to="/Dashboard/Deposit_details" onClick={handleClose}>
                      <div className="lenkk">
                        <TbMessageDots className="iicon" />{" "}
                        <h3>Deposit Details</h3>
                      </div>
                    </Link>
                    <a href={`${jutto_token}`} target="_blank">
                      <div className="lenkk">
                        <FaFolderMinus className="iicon" /> <h3>Rules</h3>
                      </div>
                    </a>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/Dashboard/Home" element={<Main_stacking />} />

        <Route
          exact
          path="/Dashboard/Latest_Deposit"
          element={<Latest_Deposit />}
        />
        <Route exact path="/Dashboard/Reward_info" element={<Reward_info />} />
        <Route exact path="/Dashboard/My_team" element={<My_team />} />
        <Route
          exact
          path="/Dashboard/Deposit_details"
          element={<Deposit_details />}
        />
        {/* </Route> */}
      </Routes>
      <Outlet />
    </>
  );
}

export default Stacking_top;
