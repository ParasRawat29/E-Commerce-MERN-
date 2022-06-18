import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderStyles } from "./headerStyles";
import { memo } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { useSelector } from "react-redux";
import search from "../../../assets/icons/search.svg";
import Announcement from "./Announcement";

function Headers({ setIsSidebarOpen }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (searchVal.trim() === "") {
      return navigate("/products");
    }
    if (searchVal.trim() !== "" && e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const keyword = searchVal.trim();
    return navigate(`/products/${keyword}`);
  };

  return (
    <HeaderStyles>
      <Announcement />
      <nav className="nav">
        <div className="logoWrapper">
          <button
            className="toggleBtn"
            onClick={() => setIsSidebarOpen((pre) => !pre)}
          >
            ☰
          </button>
          <Link className="logo" to="/" style={{ fontWeight: 900 }}>
            Ecom.
          </Link>
        </div>
        <div className="searchBar">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <p
            style={{
              display: `${searchVal.trim().length > 0 ? "flex" : "none"}`,
              fontFamily: "roboto",
              fontWeight: "700",
              margin: "-1px 15px 0 0",
              cursor: "pointer",
            }}
            onClick={() => {
              setSearchVal("");
              navigate("/products");
            }}
          >
            X
          </p>
          <i>
            <img
              src={search}
              alt="search icon"
              width="20px"
              height="20px"
              onClick={() => handleSubmit()}
            />
          </i>
        </div>
        {isAuthenticated === true ? <SignedInLinks /> : <SignedOutLinks />}
      </nav>
    </HeaderStyles>
  );
}

export default memo(Headers);
