import React from "react";
import ProfileItem from "../../profileItem";
import LoaderMini from "../../../../components/Shared/utils/loaderMini";

const SearchResultAccordian = ({ searchedUsers, isFetchUserSearchLoading }) => {
  return (
    <>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          {/* { && (
            <p className="text-muted p-content">Type Name,Email to search...</p>
          )} */}
          {searchedUsers?.length === 0 && !isFetchUserSearchLoading ? (
            <p className="text-muted p-content ms-5">No Results found</p>
          ) : (
            <>
              {searchedUsers?.map((user, i) => (
                <ProfileItem key={i} user={user} />
              ))}
            </>
          )}
          {isFetchUserSearchLoading && (
            <>
              <div className="mx-auto ms-4">
                <LoaderMini />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultAccordian;
