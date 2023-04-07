import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { 
    error, 
    success, 
    loading 
  } = useSelector((state) => state.forgotPassword);
  const [password, setPassword] = useState("");
  const [cfmPassword,setCFMPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("cfmPassword", cfmPassword);
    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, success,navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>

              <form
                className="resetPasswordForm"
                encType="application/js"
                onSubmit={resetPasswordSubmit}
              >
                <div className="password">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div id="cfmPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="cfmPassword"
                    value={cfmPassword}
                    onChange={(e) => setCFMPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword