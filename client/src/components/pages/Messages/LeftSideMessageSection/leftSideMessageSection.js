import React, { useState } from "react";

import ChatSearch from "./ChatSearch/chatSearch";
import SearchResultAccordian from "./SearchResultAccordian/searchResultAccordian";

const LeftSideMessageSection = () => {
  const [isSearchInput, setIsSearchInput] = useState(false);

  return (
    <>
      <div className="border  border-primary d-none d-sm-none d-md-block col-md-4 col-lg-3 p-0">
        <div className="d-flex flex-column align-items-start col-12">
          <ChatSearch
            isSearchInput={isSearchInput}
            setIsSearchInput={setIsSearchInput}
          />
          {isSearchInput || <div>One of two columns</div>}
        </div>
        <SearchResultAccordian />
      </div>
    </>
  );
};

export default LeftSideMessageSection;
