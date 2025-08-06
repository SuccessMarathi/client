// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Leaderboard.module.css";
// import { server } from "../../index.js"; 
// import { FaCrown } from "react-icons/fa";

// const Leaderboard = () => {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(`${server}/api/leaderboard`, {
//           headers: { token },
//         });
//         setLeaderboard(data.leaderboard);
//       } catch (error) {
//         console.error("Error fetching leaderboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   if (loading) {
//     return <div className={styles.loader}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <FaCrown />
//         <h1 className={styles.title}>LEADERBOARD</h1>
//         <FaCrown />
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Profile</th>
//             <th>Name</th>
//             <th>Total Earnings</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>
//                 {user.profileImage ? (
//                   <img
//                     src={user.profileImage}
//                     alt={`${user.name}'s Profile`}
//                     className={styles.profileImage}
//                   />
//                 ) : (
//                   <div className={styles.defaultAvatar}>👤</div>
//                 )}
//               </td>
//               <td>{user.name}</td>
//               <td>{Math.round(user.totalEarnings)} Rs</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;





import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Leaderboard.module.css";
import { server } from "../../index";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${server}/api/leaderboard`, {
          headers: { token },
        });

        if (data.success) {
          setLeaders(data.leaderboard);
        }
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className={styles.loading}>Loading leaderboard...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Top Performers</h2>
      {leaders.map((user, index) => (
        <div key={user._id} className={styles.row}>
          <div className={styles.rank}>{index + 1}</div>
          <div className={styles.imageBox}>
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>👤</div>
            )}
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.earnings}>₹{user.totalEarnings}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
