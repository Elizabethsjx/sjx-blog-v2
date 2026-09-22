import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../context/ThemeContext";
import "../assets/css/sjx-refresh.css";
export default function Layout() {
  const { darkMode } = useTheme();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={`sjx-app ${darkMode ? "dark" : ""}`}>
      <Header />
      <main
        id="main-content"
        className={pathname === "/" ? "sjx-main" : "sjx-wrap sjx-interior"}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
