import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../..";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const CourseContent = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [lectures, setLectures] = useState([]);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLectures() {
      try {
        const { data } = await axios.get(`${server}/api/getlecturesByCourseId/${courseId}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (data.lectures.length === 0) {
          toast.error("No lectures available for this course.");
        }

        setLectures(data.lectures);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch lectures. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, [courseId]);

  const handlePrev = () => {
    setCurrentLectureIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentLectureIndex((prev) => Math.min(prev + 1, lectures.length - 1));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h1 className="title">Course Content</h1>

      {lectures.length > 0 ? (
        <>
          {/* Video Player */}
          <div className="video-container">
            <iframe
              className="video-frame"
              src={lectures[currentLectureIndex]?.video} // Dynamic video URL
              title="Course Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Navigation Buttons */}
          <div className="button-container">
            <button className="prev-button" onClick={handlePrev} disabled={currentLectureIndex === 0}>
              Previous
            </button>
            <button className="next-button" onClick={handleNext} disabled={currentLectureIndex === lectures.length - 1}>
              Next
            </button>
          </div>

          {/* Lecture List */}
          <div className="video-list">
            {lectures.map((lecture, index) => (
              <div key={lecture._id} className="video-item" onClick={() => setCurrentLectureIndex(index)}>
                <span>{`Part ${index + 1}`}</span>
                <input type="checkbox" checked={index <= currentLectureIndex} readOnly className="checkbox" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-lectures">No lectures available.</p>
      )}

      {/* Internal CSS */}
      <style>{`
        .container {
          max-width: 70%;
          margin: 100px auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .video-container {
          width: 100%;
          position: relative;
        }

        .video-frame {
          width: 100%;
          height: 400px;
          border-radius: 8px;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }

        .prev-button, .next-button {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .prev-button {
          background-color: #ccc;
        }

        .next-button {
          background-color: #007bff;
          color: white;
        }

        .prev-button:disabled, .next-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .video-list {
          margin-top: 10px;
        }

        .video-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }

        .checkbox {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </div>
  );
};

export default CourseContent;
