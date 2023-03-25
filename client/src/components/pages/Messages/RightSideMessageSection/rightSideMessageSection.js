import React, { useState, useEffect } from "react";
import ChatSearchRight from "./ChatSearchRight/chatSearchRight";
import SearchResultAccordianRight from "./SearchResultAccordian/searchResultAccordianRight";

const RightSideMessageSection = () => {
  const [isSearchInputRight, setIsSearchInputRight] = useState(false);

  const [isScreenBelowMd, setIsScreenBelowMd] = useState(false);
  const [winHeight, setWinHeight] = useState(window.outerHeight);
  const [winWidth, setWinWidth] = useState(window.outerWidth);

  const handleCloseAccordian = () => {
    document.querySelector("#flush-collapseOne_Right").classList.remove("show");
    setIsSearchInputRight(false);
  };

  // Get the Win Height & Width when the Win size changes
  // and remove the event - resize when page is unmounted
  useEffect(() => {
    const handleResize = () => {
      setWinHeight(window.outerHeight);
      setWinWidth(window.outerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the boolean if the Win size is reduced below md
  useEffect(() => {
    if (winHeight <= 1080 && winWidth <= 758) {
      setIsScreenBelowMd(true);
    } else {
      setIsScreenBelowMd(false);
      handleCloseAccordian();
    }
  }, [winHeight, winWidth]);

  return (
    <>
      <div className="border border-primary col col-md-7 col-lg-8 px-0">
        <div className="d-flex flex-column align-items-start">
          <div className="d-block d-md-none col-12">
            <ChatSearchRight
              isSearchInputRight={isSearchInputRight}
              setIsSearchInputRight={setIsSearchInputRight}
              handleCloseAccordian={handleCloseAccordian}
            />
          </div>
          {/* isSearchInputRight(true) Not then isScreenBelowMd true*/}
          {isSearchInputRight ||
            (isScreenBelowMd && <div>One of two columns</div>)}
          {/* isSearchInputRight false &&  isScreenBelowMd false, then show */}
          {!isSearchInputRight && !isScreenBelowMd && (
            <div>One of two columns</div>
          )}
          <SearchResultAccordianRight />
        </div>
      </div>
    </>
  );
};

export default RightSideMessageSection;
