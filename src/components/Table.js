import React, { useCallback, useRef, useState } from "react";

const Table = ({ data }) => {
  const observer = useRef();
  const [pageNumber, setpageNumber] = useState(1);
  const [newData, setnewData] = useState(data?.slice(0, 50));

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
    <table className="table">
      <thead>
        <tr className="header-table">
          <th>نام تغییر دهنده </th>
          <th>تاریخ</th>
          <th>نام آگهی</th>
          <th>فیلد</th>
          <th>مقدار قدیم</th>
          <th>مقدار جدید</th>
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
