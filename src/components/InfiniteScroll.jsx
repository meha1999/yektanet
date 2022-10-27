import { useCallback, useRef } from "react";

const InfiniteScroll = ({ data, setnewData, pageNumber, setpageNumber }) => {
  const observer = useRef();

  const lastBookElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setpageNumber((prevPageNumber) => prevPageNumber + 1);
        setnewData((prev) => [
          ...prev,
          ...data?.slice((pageNumber - 1) * 50, pageNumber * 50),
        ]);
      }
    });
    if (node) observer.current.observe(node);
  });

  return (
    <tfoot ref={lastBookElementRef}>
      <tr></tr>
    </tfoot>
  );
};

export default InfiniteScroll;
