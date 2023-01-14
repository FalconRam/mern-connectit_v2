import React from "react";

import "./upperPart.css";

const news = [
  {
    topic: "Amazon cuts 18K, exceeds",
    createdAt: "14h ago",
    readersCount: "90,300",
  },
  {
    topic: "Mamaearth’s IPO value raises",
    createdAt: "2d ago",
    readersCount: "10,726",
  },
  {
    topic: "MobiKwik to hire mid talent",
    createdAt: "2d ago",
    readersCount: "8,948",
  },
  {
    topic: "Non-tech sector hiring",
    createdAt: "2d ago",
    readersCount: "2,758",
  },
  {
    topic: "How can freshers get job?",
    createdAt: "1d ago",
    readersCount: "4,789",
  },
];

const UpperPart = () => {
  return (
    <>
      <div>
        <div className="card">
          <h5 className="card-title mt-3 ms-3 fs-6 ">ConnectIT News</h5>
          <div className="card-body p-0">
            <ul className="news ps-0">
              {news.map((el, i) => (
                <li key={i} className="mb-1">
                  <a href="">
                    <div>
                      <span className="news-bullet"></span>
                      {el.topic}
                    </div>
                    <p className="text-muted mb-0 date-count">
                      {el.createdAt} • {el.readersCount} readers
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
// <div>
//   <span className="news-bullet"></span>
//   <li>
//     <a href="">{el.topic}</a>
//     <p className="text-muted mb-0">
//       {el.createdAt} • {el.readersCount} readers
//     </p>
//   </li>
// </div>

export default UpperPart;
