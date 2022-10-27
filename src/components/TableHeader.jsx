import { useSearchParams } from "react-router-dom";

const TableHeader = ({ order }) => {
  let [URLSearchParams, setSearchParams] = useSearchParams({});

  const handleSort = (field) => {
    URLSearchParams.set(
      "sort",
      JSON.stringify({
        field,
        order: (order[field] = order[field] === "asc" ? "dec" : "asc"),
      })
    );
    setSearchParams(URLSearchParams);
  };

  return (
    <thead>
      <tr className="header-table">
        <th onClick={() => handleSort("name")}>
          <div className="th-wrapper">
            <div>{"نام تغییر دهنده"} </div>
            {order.name === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.name === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("date")}>
          <div className="th-wrapper">
            <div>{"تاریخ"} </div>
            {order.date === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.date === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("title")}>
          <div className="th-wrapper">
            <div>{"نام آگهی"} </div>
            {order.title === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.title === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("field")}>
          <div className="th-wrapper">
            <div>{"فیلد"} </div>
            {order.field === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.field === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("old_value")}>
          <div className="th-wrapper">
            <div>{"مقدار قدیم"} </div>
            {order.old_value === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.old_value === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("new_value")}>
          {" "}
          <div className="th-wrapper">
            <div>{"مقدار جدید"} </div>
            {order.old_value === "dec" ? (
              <i class="gg-arrow-down"> </i>
            ) : order.old_value === "asc" ? (
              <i class="gg-arrow-up"></i>
            ) : (
              <></>
            )}
          </div>
        </th>
        <th onClick={() => handleSort("new_value")}>نشانه گزاری</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
