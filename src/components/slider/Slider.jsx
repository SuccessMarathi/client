// import React, { useState, useEffect } from "react";
// import styles from "./Slider.module.css";
// import beginner from "../../Assets/biginnerNew.jpg"; // Import the image
// import silver from "../../Assets/silverNew.jpg";
// import elite from "../../Assets/eliteNew.jpg";
// import gold from "../../Assets/goldNew.jpg";
// import diamond from "../../Assets/diamondNew.jpg";
// import platinum from "../../Assets/platinumNew.jpg";

// const images = [beginner, silver, elite, gold, diamond , platinum]; // Repeating the same image

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // 3-second delay

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={styles.sliderContainer}>
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`${styles.slide} ${index === currentIndex ? styles.activeSlide : ""}`}
//           style={{ backgroundImage: `url(${image})` }}
//         ></div>
//       ))}
//     </div>
//   );
// };

// export default Slider;
