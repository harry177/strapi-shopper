import { Link } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <Link to={"/"} className="header-logo">
        <h1>Strapi Shopper</h1>
      </Link>

      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/signup"}>
        <button>Sign up</button>
      </Link>
    </header>
  );
};
