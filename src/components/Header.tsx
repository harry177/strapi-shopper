import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./header.scss";

export const Header = () => {
  const [cookies, removeCookie] = useCookies(["accessToken", "userId", "userName"]);
  
  useEffect(() => {
    if (!cookies.accessToken || !cookies.userId || !cookies.userName) {
      handleLogout();
    }
  }, [cookies]);

  const handleLogout = () => {
    removeCookie("accessToken", "");
    removeCookie("userId", "");
    removeCookie("userName", "");
  };
  
  return (
    <header className="header">
      <Link to={"/"} className="header-logo">
        <h1>Strapi Shopper</h1>
      </Link>

      {cookies.accessToken ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      )}
      <Link to={"/signup"}>
        <button>Sign up</button>
      </Link>
    </header>
  );
};
