import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Packages.module.css";
import { server } from "../../index";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loginPopup, setLoginPopup] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referral: "",
    transactionId: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${server}/api/getAllCourses`);
        setPackages(response.data.course);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const referralId = urlParams.get("ref");
    if (referralId) {
      setFormData((prev) => ({ ...prev, referral: referralId }));
      setLoginPopup(true);
    }

    fetchPackages();

    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const openPopup = (pkg) => {
    if (!isAuthenticated) {
      setLoginPopup(true);
      return;
    }
    setSelectedPackage(pkg);
    setIsPopupOpen(true);
    setPaymentStatus(null);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPackage(null);
    setPaymentStatus(null);
  };

  const closeLoginPopup = () => {
    setLoginPopup(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUser = async (email, password) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        setLoginPopup(false);
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    await loginUser(email, password);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login to proceed.");
      setLoginPopup(true);
      return;
    }

    if (!selectedPackage || !selectedPackage._id) {
      alert("Error: No package selected!");
      return;
    }

    const { name, email, referral, transactionId } = formData;
    if (!name || !email || !transactionId) {
      alert("Please fill in all required fields including transaction ID.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("✅ Token found:", token);

      const response = await axios.post(
        `${server}/api/course/purchase`,
        {
          name,
          email,
          referralId: referral,
          courseId: selectedPackage._id,
          transactionId,
        },
        {
          headers: {
            token: localStorage.getItem("token") // 👈 Your backend is expecting `req.headers.token`
          },
        }
      );

      if (response.status === 200) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
    } catch (error) {
      console.error("❌ Purchase API error: ");
      console.log({
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.packages}>
      <h2 className={styles.heading}>Our Packages</h2>
      <div className={styles.cardContainer}>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div className={styles.card} key={pkg._id}>
              <img
                src={`${server}/${pkg.image}`}
                alt={pkg.name}
                className={styles.image}
              />
              <h3 className={styles.title}>{pkg.name}</h3>
              <p className={styles.price}>₹{pkg.price}/-</p>
              <p className={styles.description}>{pkg.description}</p>
              <button className={styles.buyNowButton} onClick={() => openPopup(pkg)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading packages...</p>
        )}
      </div>

      {/* Login Popup */}
      {loginPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closeLoginPopup}>
              &times;
            </button>
            <h3 className={styles.popupTitle}>Login Required</h3>
            <form onSubmit={handleLoginSubmit} className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={btnLoading}>
                {btnLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              &times;
            </button>
            <h3 className={styles.popupTitle}>
              {selectedPackage?.name} - ₹{selectedPackage?.price}
            </h3>
            {paymentStatus === "success" ? (
              <div className={styles.successMessage}>
                <p>Payment successful! Course added to your account.</p>
              </div>
            ) : paymentStatus === "failed" ? (
              <div className={styles.errorMessage}>
                <p>Payment failed. Please try again.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className={styles.paymentForm}>
                <div className={styles.qrSection}>
                  <img src="/qr.png" alt="QR Code" className={styles.qrImage} />
                  <p>
                    <strong>UPI ID:</strong> yourupi@bank
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText("yourupi@bank")}
                      className={styles.copyBtn}
                    >
                      Copy
                    </button>
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Referral ID (Optional):</label>
                  <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Transaction ID (UTR):</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Submit Payment"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Packages;
