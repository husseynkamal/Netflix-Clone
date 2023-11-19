// (c) Hussein Kamal
// Created in 2022

import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";

import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

import classes from "./Header.module.css";

const shuffleData = (arr) => arr[Math.floor(Math.random() * arr.length)];

let headerItem;

const Header = () => {
  const location = useLocation();

  const netflixData = useSelector((state) => state.netflix.netflixData);
  const series = useSelector((state) => state.netflix.tvShows);
  const movies = useSelector((state) => state.netflix.movies);
  const list = useSelector((state) => state.netflix.list);

  const currentPath = location.pathname;

  if (currentPath === "/home") {
    headerItem = shuffleData(netflixData);
  } else if (currentPath === "/tv-shows") {
    headerItem = shuffleData(series);
  } else if (currentPath === "/movies") {
    headerItem = shuffleData(movies);
  } else if (currentPath === "/my-list") {
    headerItem = shuffleData(list);
  }

  if (!headerItem || !netflixData) {
    return <LoadingSpinner />;
  } else {
    return (
      <header className="mb-5">
        <img src={headerItem.wallpaper} alt={headerItem.title} />
        <div className={`${classes.information} d-flex flex-column`}>
          <h1 className={`${classes.h} text-uppercase`}>{headerItem.title}</h1>
          <p>{headerItem.breif}</p>
          <div className={classes["btns-container"]}>
            <Link to="/watch" className="me-3">
              <FaPlay className="me-2" />
              play
            </Link>
            <button type="button">
              <BsInfoCircle className="me-2 fs-5" /> more info
            </button>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
