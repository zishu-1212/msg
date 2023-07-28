import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdArrowBackIos } from "react-icons/md";
import "./Withdraw_m.css";
import ReactLoading from "react-loading";
import {
  financeAppContractAddress,
  financeAppContract_Abi,
} from "../../utilies/Contract";
import { withdrawInfo } from "../../Redux/withdrawDetail/action";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
const web3Supply = new Web3("https://polygon-testnet.public.blastapi.io")

function Withdraw_m(props) {
  let acc = useSelector((state) => state.connect?.connection);
  let { withdrawDetail } = useSelector((state) => state.withDrawInfo);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [revad, setRevad] = useState("");
  const [revadNumber, setRevadNumber] = useState("");

  const getDetail = async () => {
    try {
      if (acc == "No Wallet") {
        console.log("No Wallet");
      } else if (acc == "Wrong Network") {
        console.log("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        console.log("Connect Wallet");
      } else {
        dispatch(withdrawInfo(acc));
      }
    } catch (e) {
      console.log("error while get detiail", e);
    }
  };
  ///interval added for checking ROI aftert every one minute
  useEffect(() => {
    setInterval(() => {
      getDetail();
    }, 60000);
    getDetail();
  }, [acc]);
  const withdrawAmount = async () => {
    getUser()
    try {
      if (acc == "No Wallet") {
        toast.info("No Wallet");
      } else if (acc == "Wrong Network") {
        toast.info("Wrong Wallet");
      } else if (acc == "Connect Wallet") {
        toast.info("Connect Wallet");
      } else {
        setLoader(true);
        if (revad === true) { // Use triple equals (===) for comparison
          const web3 = window.web3;
          // console.log("hello this not working");
          let financeAppcontractOf = new web3.eth.Contract(
            financeAppContract_Abi,
            financeAppContractAddress
          );
          await financeAppcontractOf.methods.withdraw().send({
            from: acc,
          });
          getDetail();
          props.onHide();
          setLoader(false);
          dispatch(withdrawInfo(acc));
          toast.success("successfully withdraw");
        } else {
          setLoader(false);
          toast.info("You don't have any reward yet!");
        }
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  };
  
  


  const getUser =async()=>{
    try {
  
      let financeAppcontractOf = new web3Supply.eth.Contract(
        financeAppContract_Abi,
        financeAppContractAddress
      );
      let totalUsers = await financeAppcontractOf.methods.getUserInfos(acc).call();
      console.log("invited",totalUsers[1].invited)
      setRevadNumber(totalUsers[1])
      setRevad(totalUsers[1].statics||totalUsers[1].bonusReleased ||totalUsers[1].invited > 0 )
console.log("Revad",revad);
     } catch (e) {
      console.error(e);
    }
} 
useEffect(()=>{
  getUser()
},[acc]
)
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal_bg">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 p-o">
                <div className="d-flex">
                  <div className="icons_m">
                    <Button
                      onClick={() => props.onHide()}
                      className="color-black"
                      style={{
                        backgroundColor: "#00A79D",
                        border: "1px solid #00A79D",
                      }}
                    >
                      <MdArrowBackIos></MdArrowBackIos>
                    </Button>
                  </div>
                  <h4 className="ms-5 modal_h4">Withdraw</h4>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="body_m_bg bb">
          <div className="bb">
            <div className="container">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-between">
                    <p className="text-white">statics Reward</p>
                    <p className="witddraw_p">{revadNumber.statics/1000000} USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">principal</p>
                  <p className="witddraw_p">{withdrawDetail?.totalDeposit} USDT</p>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">split reward</p>
                  <p className="witddraw_p">{revadNumber.split/1000000} USDT</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">predictWin</p>
                  <p className="witddraw_p">{revadNumber.predictWin/1000000} USDT</p>
                </div>
              </div>
            </div>
           
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">l5Released</p>
                  <p className="witddraw_p">
                    {revadNumber.l5Released/1000000} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">l5Freezed</p>
                  <p className="witddraw_p">
                    {revadNumber.l5Freezed/1000000} USDT
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">ROI</p>
                  <p className="witddraw_p">{revadNumber.roi} USDT</p>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">invited</p>
                  <p className="witddraw_p">
                    {revadNumber.invited/1000000} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">capitals</p>
                  <p className="witddraw_p">
                    {revadNumber.capitals/1000000} USDT
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">bonusReleased</p>
                  <p className="witddraw_p">
                    {revadNumber.bonusReleased/1000000} USDT
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Top</p>
                  <p className="witddraw_p">
                    {revadNumber.top} USDT
                  </p>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">bonusFreezed</p>
                  <p className="witddraw_p">{revadNumber.bonusFreezed/1000000} USDT</p>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">lastWithdaw</p>
                  <p className="witddraw_p">{revadNumber.lastWithdaw/1000000} USDT</p>
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="footer_m_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                  <p className="text-white">Total Withdraw</p>
                  <p className="witddraw_p"> USDT</p>
                </div>
              </div>
            </div>

            {/* {toatlWithdraw && <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Maximum withdraw</p>
                                    <p className='witddraw_p'>{available_withdraw} USDT</p>
                                </div>
                            </div>
                        </div>} */}
          </div>
          <Button
            className="s_d_Ws  w-100"
            onClick={() => {
              withdrawAmount();
            }}
          >
            {loader ? (
              <ReactLoading
                type="spin"
                color="#ffffff"
                className="mb-2 mx-auto"
                height={30}
                width={30}
              />
            ) : (
              "Withdraw"
            )}
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Withdraw_m;
