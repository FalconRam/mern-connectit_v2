import React from 'react'

const ProfileItem = ({user}) => {
  return (
    <>
      <div
        className="d-flex flex-row align-items-center gap-2 likeBtn mb-1"
        // onClick={() => handleProfile(user?._id)}
      >
        <img
          src={
            user?.profilePicture === ""
              ? user?.name?.charAt(0).toUpperCase()
              : (user?.profilePicture && user?.profilePicture) ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
          alt={user?.name?.charAt(0).toUpperCase()}
        ></img>
        <div>
          <h6 className="mb-0 postCreator">{user?.name}</h6>
          <p className="text-muted m-0 postCreated"></p>
        </div>
      </div>
    </>
  );
}

export default ProfileItem