import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsersBySearch } from "../../../../../actions/chat";
import SearchResultAccordianRight from "../SearchResultAccordian/searchResultAccordianRight";

import "./chatSearchRight.css";

const ChatSearchRight = ({
  isSearchInputRight,
  setIsSearchInputRight,
  handleCloseAccordian,
}) => {
  const dispatch = useDispatch();
  const [shouldActive, setShouldActive] = useState(true);

  const { users, isFetchUserSearchLoading } = useSelector(
    (state) => state.chat
  );

  const handleFocus = () => {
    setIsSearchInputRight(true);
  };

  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const collapseElement = document.querySelector("#flush-collapseOne_Right");
    isSearchInputRight && collapseElement.classList.add("show");
    setSearchedUsers(users?.users);
  }, [isSearchInputRight, users]);

  const handleClearUsers = () => {
    setSearchedUsers([]);
  };

  const searchKeyword = useRef();

  const handleSearch = () => {
    dispatch(getUsersBySearch(searchKeyword.current.value));
  };

  return (
    <>
      <div className="chatSearch-container">
        <div className="input-group input-group-sm mb-3" onFocus={handleFocus}>
          <button
            className="btn input-group-text eyeButton"
            type="button"
            id="button-addon2"
            onClick={handleCloseAccordian}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>
          <input
            ref={searchKeyword}
            type="text"
            className="form-control form-control-sm form-control-password"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Type Name,Email to search..."
            onChange={handleClearUsers}
          />
          <button
            className="btn input-group-text eyeButton"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      <SearchResultAccordianRight
        searchedUsers={searchedUsers}
        isFetchUserSearchLoading={isFetchUserSearchLoading}
      />
    </>
  );
};

export default ChatSearchRight;
