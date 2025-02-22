

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addlectures.css";
import { server } from "../../index";

const AddLectures = () => {
  const [courses, setCourses] = useState([]); // Store fetched courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Store selected course ID
  const [lectureLink, setLectureLink] = useState(""); // Store lecture link

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${server}/api/getAllCourses`);

        // Ensure "course" exists and is an array
        if (response.data && Array.isArray(response.data.course)) {
          setCourses(response.data.course);
        } else {
          console.error("Invalid API response:", response.data);
          setCourses([]); // Prevent errors in .map()
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // Handle lecture submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedCourse || !lectureLink) {
      alert("Please select a course and enter a lecture link.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
  
      console.log("Token being sent:", token); // Debugging
  
      if (!token) {
        alert("Please login first.");
        return;
      }
  
      const { data } = await axios.post(
        `${server}/api/course/${selectedCourse}/lecture`,
        { 
        //   title: "Sample Lecture", 
        //   description: "This is a sample description", 
          video: lectureLink 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is sent
            "Content-Type": "application/json",
          },
        }
      );
  
      alert(data.message); // Show success message
      setLectureLink(""); // Reset input
      setSelectedCourse(""); // Reset selection
    } catch (error) {
      console.error("Error adding lecture:", error);
      alert(error.response?.data?.message || "Failed to add lecture. Please try again.");
    }
  };
  
  

  return (
    <div className="lecture-form-container">
      <form className="lecture-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Add Lectures</h1>

        <div className="form-group">
          <label>Select Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
            <option value="">Select a Course</option>
            {courses.length > 0 ? (
              courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))
            ) : (
              <option disabled>Loading courses...</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Add Video Link</label>
          <input
            type="text"
            placeholder="Enter lecture link..."
            value={lectureLink}
            onChange={(e) => setLectureLink(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="button" className="cancel-btn" onClick={() => setLectureLink("")}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLectures;
