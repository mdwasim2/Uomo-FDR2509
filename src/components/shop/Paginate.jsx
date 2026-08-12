import { useState } from "react";
import * as ReactPaginateModule from "react-paginate";

const ReactPaginate =ReactPaginateModule



const Paginate = ({ itemsPerPage }) => {
  const items = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14
  ];

  function Items({ currentItems }) {
    return (
      <>
        {currentItems.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % items.length;

    console.log(
      `User requested page number ${event.selected}, offset ${newOffset}`
    );

    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      {typeof ReactPaginate === "function" ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
        />
      ) : (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className="cursor-pointer border px-3 py-1"
              onClick={() =>
                handlePageClick({
                  selected: index,
                })
              }
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Paginate;