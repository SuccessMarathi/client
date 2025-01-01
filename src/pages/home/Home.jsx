import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Hero from "../../Assets/heroImg.jpg"
import founderImage from '../../Assets/founder.jpg'




const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          
        <div className="mainContent">
        <div className="textContainer">
          <span className="success">Success</span>
          <span className="marathi">मराठी</span>
          <button onClick={() => navigate("/packages")} className="common-btn">
            Get Started
          </button>
        </div>
        <div className="homeimgContainer">
          <img src={Hero} alt="heroImg" />
        </div>
        </div>
 
        <div className="aboutSection">
        <h2 className="sectionTitle">About Company</h2>
        <p className="text">
           Success Marathi is an online learning platform from which you can learn very good skills and earn very good money.
        </p>
        <h2 className="sectionTitle">Our Mission</h2>
        <p className="text">
           Our main mission is to take Marathi people forward in the financial sector, to make Marathi people successful in business and to fulfill the dreams of Marathi people, but also to create employment for the whole of India and to fulfill their dreams, to give them a better life through the platform Success Marathi.
        </p>

        {/* Founder Section */}
        <div className="founderSection">
          <img src={founderImage} alt="Akash Rathod" className="founderImage" />
          <p className="founderText">
            <strong>Founder:</strong> <strong>Akash Rathod</strong> <br />
            Akash Rathod began his journey as a college student with a vision to empower individuals. Over the years, he has trained more than <strong>10,000 people</strong> to excel in both offline and online businesses, while also guiding individuals spiritually. His passion for creating a platform like Success Marathi reflects his dedication to uplift the Marathi community and contribute towards the betterment of the entire nation.
          </p>
        </div>
      </div>
       



        </div>
        
      </div>
      
    </div>
  );
};

export default Home;
