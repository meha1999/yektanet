import React, { useEffect, useState } from "react";

import thedata from "../data/data.json";
import Bst from "../utils/bst";
import Table from "./Table";
import { useSearchParams } from "react-router-dom";

const TableWrapper = () => {
  let [URLSearchParams, setSearchParams] = useSearchParams({});
  const [data, setData] = useState(thedata);
  const [dateSearch, setDateSearch] = useState("");
  const [bstData, setBstData] = useState({});

  const handleSubmitUrl = (data, key) => {
    !data ? URLSearchParams.delete(key) : URLSearchParams.set(key, data);
    setSearchParams(URLSearchParams);
  };

  const bst = new Bst();

  useEffect(() => {
    thedata.map((item) => bst.insert(item));
  }, []);

  useEffect(() => {
    if (dateSearch) {
      setData(bst.find(dateSearch, bstData));
      ["name", "title", "field"].map((item) => URLSearchParams.delete(item));
      setSearchParams(URLSearchParams);
    } else {
     setData(thedata);
    }
  }, [dateSearch]);

  useEffect(() => {
    bst.root && setBstData(bst.root);
  }, [bst.root]);

  const handleSearchAll = (searchData) => {
    let finalData = [...thedata];
    searchData.map(
      (searchItem) =>
        (finalData = finalData.filter((item) =>
          item[searchItem]
            .toLowerCase()
            .includes(
              URLSearchParams.get(searchItem)
                ? URLSearchParams.get(searchItem)
                : "".toLowerCase()
            )
        ))
    );
    setData(finalData);
  };

  useEffect(() => {
    handleSearchAll(["name", "title", "field"]);
  }, [URLSearchParams]);

  return (
    <div className="table-wrapper">
      <div className="sorting-wrapper">
        <div className="input-sort">
          <label htmlFor="name">تام تغییر دهنده</label>
          <input
            type={"text"}
            id="name"
            value={URLSearchParams.get("name")}
            onChange={(e) => handleSubmitUrl(e.target.value, "name")}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="timestamp">تاریخ</label>
          <input
            type={"text"}
            id="timestamp"
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="title">نام آگهی</label>
          <input
            type={"text"}
            id="title"
            value={URLSearchParams.get("title")}
            onChange={(e) => handleSubmitUrl(e.target.value, "title")}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="field">نام فیلد</label>
          <input
            type={"text"}
            id="field"
            value={URLSearchParams.get("field")}
            onChange={(e) => handleSubmitUrl(e.target.value, "field")}
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
