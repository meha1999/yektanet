import { useCallback, useEffect, useRef, useState } from "react";
import { quickSort } from "../utils/quickSort";

const Table = ({ data, setData }) => {
  const observer = useRef();
  const [pageNumber, setpageNumber] = useState(1);
  const [newData, setnewData] = useState(data?.slice(0, 50));
  const [isUpdating, setIsUpdating] = useState(false);
  const [order, setOrder] = useState({
    name: "dec",
    date: "dec",
    title: "dec",
    field: "dec",
    old_value: "dec",
    new_value: "dec",
  });
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("Bookmarks")) || []
  );

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

  useEffect(() => {
    setnewData(data?.slice(0, 50));
    setpageNumber(1);
    setIsUpdating(false);
  }, [data, isUpdating, order]);

  const handleSort = (field) => {
    setIsUpdating(false);
    setData(
      quickSort(
        data,
        field,
        0,
        data.length - 1,
        order[field] === "asc" ? "dec" : "asc"
      )
    );
    order[field] = order[field] === "asc" ? "dec" : "asc";
    setOrder(order);
    setIsUpdating(true);
  };

  const handleBookmark = (id) => {
    const finalBookmarks = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    localStorage.setItem("Bookmarks", JSON.stringify(finalBookmarks));
    setBookmarks(finalBookmarks);
  };

  return (
    <table className="table">
      <thead>
        <tr className="header-table">
          <th onClick={() => handleSort("name")}>نام تغییر دهنده</th>
          <th onClick={() => handleSort("date")}>تاریخ</th>
          <th onClick={() => handleSort("title")}>نام آگهی</th>
          <th onClick={() => handleSort("field")}>فیلد</th>
          <th onClick={() => handleSort("old_value")}>مقدار قدیم</th>
          <th onClick={() => handleSort("new_value")}>مقدار جدید</th>
          <th onClick={() => handleSort("new_value")}>نشانه گزاری</th>
        </tr>
      </thead>
      <tbody>
        {newData?.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.title}</td>
            <td>{item.field}</td>
            <td>{item.old_value}</td>
            <td>{item.new_value}</td>
            <td>
              <div onClick={() => handleBookmark(item.id)}>
                {bookmarks.includes(item.id) ? "*" : "-"}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot ref={lastBookElementRef}>
        <tr></tr>
      </tfoot>
    </table>
  );
};

export default Table;
