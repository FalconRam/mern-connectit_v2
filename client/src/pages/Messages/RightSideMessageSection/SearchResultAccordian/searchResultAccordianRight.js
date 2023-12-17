import React from "react";
import ProfileItem from "../../profileItem";
import LoaderMini from "../../../../components/Shared/utils/loaderMini";

const SearchResultAccordianRight = ({
  searchedUsers,
  isFetchUserSearchLoading,
  shouldActive,
}) => {
  return (
    <>
      <div
        id="flush-collapseOne_Right"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne_Right"
        data-bs-parent="#accordionFlushExample_Right"
      >
        <div className="accordion-body">
          {/* {shouldActive && (
            <p className="text-muted p-content">Type Name,Email to search...</p>
          )} */}

          {searchedUsers?.length === 0 && !isFetchUserSearchLoading ? (
            <p className="text-muted p-content text-center">No Results found</p>
          ) : (
            <>
              {searchedUsers?.map((user, i) => (
                <ProfileItem key={i} user={user} />
              ))}
            </>
          )}
          {isFetchUserSearchLoading && (
            <>
              <div className="mx-auto">
                <LoaderMini />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultAccordianRight;
