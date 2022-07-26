import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function useThemeSwitcher() {
  const [mode, setMode] = useState(() => localStorage.getItem("mode"));
  const modeValue = "fa fa-sun";
  useEffect(() => {
    window.addEventListener("storage", setPreferedTheme);
    return () => {
      window.removeEventListener("storage", setPreferedTheme);
    };
  }, []);

  const setPreferedTheme = () => {
    const _mode = localStorage.getItem("mode");
    if (_mode) {
      setMode(_mode);
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    var appThemeIcon = document.getElementById("appThemeIcon");
    appThemeIcon.classList.remove("fa-sun");
    appThemeIcon.classList.remove("fa-moon");

    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      localStorage.setItem("mode", "dark");
      appThemeIcon.classList.add("fa-sun");
 
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("mode", "light");
      appThemeIcon.classList.add("fa-moon"); 
     }
  }, [mode]);
  const onClickMode = (e) => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
  };

  return (
    <p
    width="80"
    height="80"
   // viewBox="0 0 250 250"
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "0",
      width: "auto",
      height: "auto",
      zIndex: 1005,
    }} 
    className="mb-0 github-corner"
  >
      <a className="cursor-pointer" onClick={onClickMode}>
        <i
          id="appThemeIcon"
          className={mode === "dark" ? "fa fa-sun" : "fa fa-moon"}
        ></i>
      </a>
    </p>
  );
}

export default useThemeSwitcher;
