import React, { useEffect, useState } from "react";

import thedata from "../data/data.json";
import Bst from "../utils/bst";
import Table from "./Table";
import { useSearchParams  } from "react-router-dom";

const TableWrapper = () => {
  const [data, setData] = useState(thedata);
  const [dateSearch, setDateSearch] = useState("");
  const [bstData, setBstData] = useState({});


  let [URLSearchParams, setSearchParams] = useSearchParams({});

  function handleSubmit() {
    let params = { key: "ggggggggggggggggggggt" };
    setSearchParams(params);
  }
  console.log(URLSearchParams.get("key"));


  const bst = new Bst();

  useEffect(() => {
    thedata.map((item) => bst.insert(item));
  }, []);

  useEffect(() => {
    dateSearch && setData(bst.find(dateSearch, bstData));
    !dateSearch && setData(thedata);
  }, [dateSearch]);

  useEffect(() => {
    bst.root && setBstData(bst.root);
  }, [bst.root]);

  const handleSearchAll = (searchData, field) => {
    setData(
      data.filter((item) =>
        item[field].toLowerCase().includes(searchData.toLowerCase())
      )
    );
  };

  return (
    <div className="table-wrapper">
      <div className="sorting-wrapper">
        <div className="input-sort">
          <label htmlFor="name">تام تغییر دهنده</label>
          <input
            type={"text"}
            id="name"
            onChange={(e) => handleSearchAll(e.target.value, "name")}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="timestamp">تاریخ</label>
          <input
            type={"text"}
            id="timestamp"
            onChange={(e) => setDateSearch(e.target.value)}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="title">نام آگهی</label>
          <input
            type={"text"}
            id="title"
            onChange={(e) => handleSearchAll(e.target.value, "title")}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="field">نام فیلد</label>
          <input
            type={"text"}
            id="field"
            onChange={(e) => handleSearchAll(e.target.value, "field")}
          />
        </div>
      </div>
      <div>
        <Table data={data} setData={setData} />
      </div>
    </div>
  );
};

export default TableWrapper;
