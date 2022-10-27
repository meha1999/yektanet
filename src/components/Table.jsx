import {  useEffect, useState } from "react";
import { quickSort } from "../utils/quickSort";
import { useSearchParams } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import InfiniteScroll from "./InfiniteScroll";

const Table = ({ data, setData }) => {
  let [URLSearchParams] = useSearchParams({});
  const [pageNumber, setpageNumber] = useState(1);
  const [newData, setnewData] = useState(data?.slice(0, 50));
  const [isUpdating, setIsUpdating] = useState(false);
  const [order, setOrder] = useState({
    name: "",
    date: "",
    title: "",
    field: "",
    old_value: "",
    new_value: "",
  });

  useEffect(() => {
    setnewData(data?.slice(0, 50));
    setpageNumber(1);
    setIsUpdating(false);
  }, [data, isUpdating, order]);

  useEffect(() => {
    if (URLSearchParams.get("sort")) {
      setIsUpdating(false);
      const sortData = JSON.parse(URLSearchParams.get("sort"));
      setData(
        quickSort(data, sortData.field, 0, data.length - 1, sortData.order)
      );
      order[sortData.field] = sortData.order;
      setOrder(order);
      setIsUpdating(true);
    }
  }, [URLSearchParams.get("sort")]);

  return (
    <table className="table">
      <TableHeader order={order} />
      <TableBody data={newData} />
      <InfiniteScroll
        data={data}
        setnewData={setnewData}
        pageNumber={pageNumber}
        setpageNumber={setpageNumber}
      />
    </table>
  );
};

export default Table;
