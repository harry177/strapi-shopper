import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
