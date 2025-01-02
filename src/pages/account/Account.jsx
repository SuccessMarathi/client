import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user, referrer }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    toast.success("Referral link copied!");
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <div className="section userinfo">
              <h3>User Information</h3>
              <p>
                <strong>User Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Contact: </strong>
                {user.contact || "N/A"}
              </p>
              <div className="referral-section">
                <strong>Referral Link: </strong>
                <span className="referral-link">{user.referralLink}</span>
                <button onClick={copyReferralLink} className="copy-btn">
                  Copy
                </button>
              </div>
            </div>

            <div className="section sponsorinfo" >
              <h3>Sponsor Section</h3>
              <p>
                <strong>Referrer Name: </strong>
                {referrer?.name || "N/A"}
              </p>
              <p>
                <strong>Referrer Email: </strong>
                {referrer?.email || "N/A"}
              </p>
              <p>
                <strong>Referrer Contact: </strong>
                {referrer?.contact || "N/A"}
              </p>
            </div>
          <div className="profielbtns">
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="common-btn"
            >
              <MdDashboard />
              Dashboard
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}

            <button
              onClick={logoutHandler}
              className="common-btn logout-btn"
            >
              <IoMdLogOut />
              Logout
            </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
