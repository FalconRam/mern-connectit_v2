import React from "react";

const NotificationBox = () => {
  return (
    <a
      tabindex="0"
      class="btn btn-lg btn-secondary"
      role="button"
      data-bs-toggle="popover"
      data-bs-placement="bottom"
      data-bs-trigger="focus"
      data-bs-title="Dismissible Notifications Box"
      data-bs-content=""
    >
      <div>Notifications Box</div>
    </a>
  );
};

export default NotificationBox;
