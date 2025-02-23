import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaTrash } from "react-icons/fa";
import styles from "./Deletelecture.module.css";
import { server } from "../../index";

const DeleteCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [lectures, setLectures] = useState([]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${server}/api/getAllCourses`);
        
        console.log("Courses API Response:", response.data); // Debugging
  
        if (response.data && Array.isArray(response.data.course)) {
          setCourses(response.data.course);
        } else {
          console.error("Invalid API response:", response.data);
          setCourses([]); 
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
  
    fetchCourses();
  }, []);
  

  // Fetch lectures when a course is selected
  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);

    if (!courseId) {
      setLectures([]);
      return;
    }

    try {
      const response = await axios.get(
        `${server}/api/getlecturesByCourseId/${courseId}`
      );
      setLectures(response.data.lectures);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Delete a lecture
  const handleDeleteLecture = async (lectureId) => {
    const token = localStorage.getItem("token"); // Get token from local storage
  
    console.log("Token being sent:", token); // Debugging
  
    if (!token) {
      alert("Please login first.");
      return;
    }
  
    try {
      const { data } = await axios.delete(
        `${server}/api/lecture/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is sent
            "Content-Type": "application/json",
          },
        }
      );
  
      alert(data.message); // Show success message
      setLectures((prevLectures) => prevLectures.filter((lecture) => lecture._id !== lectureId));
  
      console.log("Lecture deleted successfully");
    } catch (error) {
      console.error("Error deleting lecture:", error);
      alert(error.response?.data?.message || "Failed to delete lecture. Please try again.");
    }
  };
  
  

  const fetchCourses = async () => {
    try {
      const response = await axios.get("${server}/api/getAllCourses");
  
      console.log("Courses API Response:", response.data); // Debugging
  
      if (response.data && Array.isArray(response.data.courses)) {
        setCourses(response.data.courses);
      } else {
        setCourses([]); // Ensure it’s always an array
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]); 
    }
  };
  

  return (
    <div className={styles.container}>
      <h2>Delete Lectures</h2>

      {/* Course Selection */}
      <label>Select Package</label>
      <select onChange={handleCourseChange} value={selectedCourse}>
        <option value="">Select a Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Display Lectures */}
      {lectures.length > 0 && (
        <div className={styles.lectureList}>
          <h3>Lectures for Selected Course</h3>
          <ul>
          {lectures.map((lecture) => (
           <li key={lecture._id}>
           <p>{lecture.title || "Lecture Video"}</p>
         
           {/* Responsive Video Container */}
           <div className={styles.videoContainer}>
             <iframe
               src={lecture.video}
               title="Lecture Video"
               frameBorder="0"
               allowFullScreen
             ></iframe>
           </div>
         
           <button className="deleteButton" onClick={() => handleDeleteLecture(lecture._id)} style={{"marginTop":"10px"}}>Delete</button>
         </li>
         
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default DeleteCourse;
