import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faMagnifyingGlassLocation,
  faFileWaveform,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Routing from "./Routing";
import About from "./About";
import RouteHistory from "./RouteHistory";
import "./Sidebar.css";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const [mainview, setMainview] = useState(true);
  const [sideview, setSideview] = useState(false);
  const [nav, setNav] = useState(0);
  const [navSideview, setNavSideview] = useState(2);
  const [buttonStatus, setButtonStatus] = useState({
    main: "open",
    side: "open",
  });

  const pages = [<Routing />, <About />, <RouteHistory />];
  const titleList = ["--Routing--", "--About--", "--Route History--"];

  useEffect(() => {
    switch (true) {
      case sideview && mainview:
        setButtonStatus({ main: "open", side: "superOpen" });
        break;
      case mainview && !sideview:
        setButtonStatus({ main: "open", side: "open" });
        break;
      case !mainview && sideview:
        setButtonStatus({ main: "gigaOpen", side: "gigaOpen" });
        break;
      default:
        setButtonStatus({ main: "closed", side: "closed" });
        break;
    }
  }, [mainview, sideview]);

  return (
    <>
      <SidebarButton
        view={sideview}
        setView={setSideview}
        openIcon={faAngleDoubleRight}
        closeIcon={faAngleDoubleLeft}
        name="side"
        className={buttonStatus.side}
      />
      <SidebarButton
        view={mainview}
        setView={setMainview}
        openIcon={faAngleRight}
        closeIcon={faAngleLeft}
        name="main"
        className={buttonStatus.main}
      />

      <div className={`sidebar mainview ${mainview ? "open" : ""}`}>
        <div className="header">
          <h1>E-TRI</h1>
          <h3>{titleList[nav]}</h3>
        </div>
        <div className="nav">
          <FontAwesomeIcon
            icon={faMagnifyingGlassLocation}
            onClick={() => setNav(0)}
            className={`sidebar-icon ${nav === 0 ? "active" : ""}`}
          />
          <FontAwesomeIcon
            icon={faQuestion}
            onClick={() => setNav(1)}
            className={`sidebar-icon ${nav === 1 ? "active" : ""}`}
          />
        </div>
        <div className="content">{pages[nav]}</div>
      </div>

      <div
        className={`sidebar sideview ${
          sideview ? (mainview ? "superOpen" : "open") : ""
        }`}
      >
        <div className="header">
          <h1>Information</h1>
          <h3>{titleList[navSideview]}</h3>
        </div>
        <div className="nav">
          <FontAwesomeIcon
            icon={faFileWaveform}
            onClick={() => setNavSideview(2)}
            className={`sidebar-icon ${navSideview === 2 ? "active" : ""}`}
          />
        </div>
        <div id="sideview" className="content">
          {pages[navSideview]}
        </div>
      </div>
    </>
  );
}
