import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Chat from "../../../components/Chat/chat";
import MiniProfilePicture from "../../../components/Shared/MiniProfilePicture/miniProfilePicture";
import "./leftSideProfilePage.css";

const LeftSideProfilePage = () => {
  const history = useHistory();
  const isChatPage = useLocation().pathname === "/chats";

  const [isScreenBelowMd, setIsScreenBelowMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenBelowMd(window.innerWidth <= 758);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once initially to set state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const spanProps = !isScreenBelowMd
    ? {
        "data-bs-toggle": "offcanvas",
        "data-bs-target": "#offcanvasWithBothOptions",
        "aria-controls": "offcanvasWithBothOptions",
      }
    : {};

  const handleFunctions = {
    feeds: { navigateTo: "/feeds" },
    search: { navigateTo: "/search" },
    chats: {
      condition: !isChatPage && isScreenBelowMd,
      navigateTo: "/chats",
    },
    notification: { navigateTo: "/notification" },
    profileSettings: { navigateTo: "/profile/settings" },
  };

  const handleButton = useCallback(
    (action) => {
      if (action.condition === undefined || action.condition) {
        history.push(action.navigateTo);
      }
    },
    [history]
  );

  const sideNavItems = useMemo(
    () => [
      {
        name: "Home",
        action: () => handleButton(handleFunctions.feeds),
        icon: <i className="bi bi-house-door-fill sideNavIcon" />,
      },
      {
        name: "Create",
        otherAttributes: {
          "data-bs-toggle": "modal",
          "data-bs-target": "#createModal",
        },
        icon: <i className="bi bi-plus-circle-fill sideNavIcon" />,
      },
      {
        name: "Search",
        action: () => handleButton(handleFunctions.search),
        icon: <i className="bi bi-search sideNavIcon" />,
      },
      {
        name: "Messages",
        action: () => handleButton(handleFunctions.chats),
        otherAttributes: isChatPage ? {} : spanProps,
        icon: <i className="bi bi-chat-fill sideNavIcon" />,
      },
      {
        name: "Notification",
        action: () => handleButton(handleFunctions.notification),
        icon: <i className="bi bi-bell-fill sideNavIcon" />,
      },
      {
        name: "Settings",
        action: () => handleButton(handleFunctions.profileSettings),
        icon: <i className="bi bi-gear-fill sideNavIcon" />,
      },
      {
        icon: <MiniProfilePicture isSideNav={true} isComment={false} />,
      },
    ],
    [handleButton, handleFunctions, isChatPage, spanProps]
  );

  return (
    <>
      <div>
        <div className="nav d-flex flex-sm-row flex-md-column justify-content-between align-items-start gap-2 customMargin2 customFontSideNav">
          {sideNavItems.map((item, index) => (
            <li className="nav-item p-2 text-dark" key={index}>
              {item?.icon?.type?.name !== "MiniProfilePicture" ? (
                <span
                  onClick={item.action}
                  className="sideNavButton"
                  {...(item.otherAttributes || {})}
                >
                  {item.icon}
                  <h6 className="d-lg-inline-block d-none d-sm-none d-md-none ms-2">
                    {item.name}
                  </h6>
                </span>
              ) : (
                item.icon
              )}
            </li>
          ))}
        </div>
      </div>
      <Chat handleButton={() => handleButton(handleFunctions.notification)} />
    </>
  );
};

export default LeftSideProfilePage;
