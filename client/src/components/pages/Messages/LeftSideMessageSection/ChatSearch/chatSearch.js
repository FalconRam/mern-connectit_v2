import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsersBySearch } from "../../../../../actions/chat";
import SearchResultAccordian from "../SearchResultAccordian/searchResultAccordian";
import "../../../Messages/RightSideMessageSection/ChatSearchRight/chatSearchRight.css";

const ChatSearch = ({ isSearchInput, setIsSearchInput }) => {
  const dispatch = useDispatch();

  const handleFocus = () => {
    setIsSearchInput(true);
  };
  const { users, isFetchUserSearchLoading } = useSelector(
    (state) => state.chat
  );

  const [searchedUsers, setSearchedUsers] = useState([]);
  useEffect(() => {
    const collapseElement = document.querySelector("#flush-collapseOne");
    isSearchInput && collapseElement.classList.add("show");
    setSearchedUsers(users?.users);
  }, [isSearchInput, users]);

  const handleClearUsers = () => {
    setSearchedUsers([]);
  };

  const searchKeyword = useRef();

  const handleSearch = () => {
    dispatch(getUsersBySearch(searchKeyword.current.value));
  };

  const handleCloseAccordian = () => {
    document.querySelector("#flush-collapseOne").classList.remove("show");
    setIsSearchInput(false);
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
            placeholder="Name or Email..."
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
      <SearchResultAccordian
        searchedUsers={searchedUsers}
        isFetchUserSearchLoading={isFetchUserSearchLoading}
      />
    </>
  );
};

export default ChatSearch;
