import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CourseContent.module.css"; // Assuming a modular CSS file

const CourseContent = () => {
  const { courseId } = useParams();

  const courseVideos = {
    1: "https://www.youtube.com/embed/5cJin3fQnDk",
    2: "https://www.youtube.com/embed/9G68w40SLSY",
    3: "https://www.youtube.com/embed/hFEKnzineMY",
    4: "https://www.youtube.com/embed/LNmI9J-pLQA",
  };

  const videoUrl = courseVideos[courseId];

  return (
    <div className={styles.courseContent}>
      <iframe
        width="100%"
        height="auto" // Ensures responsive sizing
        style={{ maxWidth: '640px', aspectRatio: '16 / 9' }}
        src={videoUrl}
        title={`Course ${courseId} Video`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CourseContent;
