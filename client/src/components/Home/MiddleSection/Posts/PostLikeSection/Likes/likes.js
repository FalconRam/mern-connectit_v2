import React from "react";

import "./likes.css";

const Likes = ({ isLiked, likes, handleLike }) => {
  return (
    <>
      {isLiked ? (
        // Red Heart
        <div className="d-flex align-items-center">
          <i
            className="bi bi-heart-fill likeIcon likeIcon-danger"
            onClick={handleLike}
          ></i>
          <p className="p-like">
            &nbsp;
            {likes?.length !== 0 ? likes?.length : null}{" "}
            {likes?.length > 1 ? "Likes" : "Like"}
          </p>
        </div>
      ) : (
        // Heart Outline
        <div className="d-flex align-items-center">
          <i className="bi bi-heart likeIcon" onClick={handleLike}></i>
          &nbsp;
          <p className="p-like">
            &nbsp;
            {likes?.length !== 0 ? likes?.length : null}{" "}
            {likes?.length > 1 ? "Likes" : "Like"}
          </p>
        </div>
      )}
    </>
  );

  // if (likes?.length > 0) {
  //   return likes?.find((like) => like === userId) ? (
  //     <>
  //       <div className="d-flex align-items-center">
  //         <i className="bi bi-heart likeIcon"></i>&nbsp;
  //         {likes?.length > 2 ? (
  //           <p className="p-like">You, {likes?.length - 1} others</p>
  //         ) : (
  //           <p className="p-like">
  //             {likes?.length} Like{likes?.length > 1 ? "s" : ""}
  //           </p>
  //         )}
  //       </div>
  //     </>
  //   ) : (
  //     <>
  //       <div className="d-flex align-items-center">
  //         <i className="bi bi-heart-fill text-danger likeIcon"></i>
  //         <p className="p-like text-danger">
  //           &nbsp;{likes?.length} {likes?.length <= 1 ? "Like" : "Likes"}
  //         </p>
  //       </div>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <div>
  //       <i className="bi bi-heart-fill likeIcon"></i>
  //       <p className="p-like">&nbsp;Like</p>
  //     </div>
  //   </>
  // );
};

export default Likes;
