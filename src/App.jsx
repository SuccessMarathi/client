import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";

import Dashboard from "./pages/dashbord/Dashboard";

import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Packages from "./pages/packages/Packages";
import MyCourses from "./pages/mycourses/MyCourses";
import CourseContent from "./pages/coursecontent/CourseContent";

import MyAffiliates from "./pages/affiliates/MyAffiliates";
import Leaderboard from "./pages/leaderboard/Leaderboard";

import UpdateProfile from "./pages/updateProfile/UpdateProfile";

import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./components/termsAndConditions/TermsAndConditions";
import ContactUs from "./components/contact/ContactUs"
import CancellationRefund from "./components/cnacellationRefund/CancellationRefund";
import SuccessPage from "./components/SuccessPage";
import FailurePage from "./components/FailurePage";


// import Slider from "./components/slider/Slider";


const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            {/* <Route path="/verify" element={isAuth ? <Home /> : <Verify />} /> */}
            <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            />
            <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />



            {/* sfhjkdfhsk */}

            <Route
              path="/packages"
              element={ <Packages user={user} />}
            />


            <Route
              path="/myCourses"
              element={isAuth ? <MyCourses user={user} /> : <Login />}
            />


            <Route
              path="/course-content/:courseId"
              element={isAuth ? <CourseContent user={user} /> : <Login />}
            />


            <Route
              path="/my-affiliates"
              element={isAuth ? <MyAffiliates user={user} /> : <Login />}
            />


            <Route
              path="/leaderboard"
              element={isAuth ? <Leaderboard user={user} /> : <Login />}
            />

            <Route
              path="/update-profile"
              element={isAuth ? <UpdateProfile user={user} /> : <Login />}
            />








            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />

            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />

            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />

            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />

            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashbord user={user} /> : <Login />}
            />



            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/success"
              element={isAuth ? <SuccessPage user={user} /> : <Login />}
            />
             <Route
              path="/failure"
              element={isAuth ? <FailurePage user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

            <Route path="/ContactUs" element={<ContactUs />} />

            <Route path="/CancellationRefund" element={<CancellationRefund />} />


          </Routes>
          <Footer />

        </BrowserRouter>
      )}
    </>
  );
};

export default App;
