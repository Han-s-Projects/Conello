import styles from "./Header.module.css";
import logo from "assets/conello_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  // Header 컴포넌트 마운트 될 때마다 현재 boards 뭔지 알아야됨. 그래야 /boards url로 넘어갈 때 state 넘길 수 있음.
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trello_token");

    navigate("/");
  };

  useEffect(() => {
    // 함수 하나 선언할 건데, 얘가 하는게 뭐야? boards에 넘겨줄 데이터잖아
    const fetchData = async () => {
      const token = localStorage.getItem("trello_token");
      const { data } = await axios.get(
        `https://api.trello.com/1/members/me/?key=${process.env.REACT_APP_KEY}&token=${token}`
      );

      return {idOrganizations: data.idOrganizations, token}
    };
  }, []);

  return (
    <header className={styles.container}>
      <Link to={"/boards"}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <button className={styles.logout} onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
};

export default Header;
