import React from "react";

import { useHistory, useLocation } from "react-router-dom";

const Chat = () => {
  const history = useHistory();
  const isChatPage = useLocation().pathname === "/chats";
  const handleMessages = () => {
    // Push to path only if not a Chat page and Win is below md
    isChatPage || history.push("/chats");
  };
  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <button
            className="switchButton"
            data-bs-dismiss="offcanvas"
            onClick={handleMessages}
          >
            Dedicated Chat Window?
          </button>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </>
  );
};

export default Chat;
