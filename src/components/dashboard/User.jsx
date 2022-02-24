import { useSelector } from "react-redux";
import styles from "../styles/profile.module.css";

const UserPage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  let pattern = /(\w)\w*\s*(\w)\w*/g;
  let result = pattern.exec(user.name);
  const avatar = result[1] + result[2];

  return (
    <section className={styles.profilesection}>
      <div className={styles.profilecard}>
        <div className={styles.avatar}>
          <h3>{avatar}</h3>
        </div>
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
        <h3>{user.address}</h3>
        <i className="fas fa-check-circle"></i>
      </div>
    </section>
  );
};

export default UserPage;
