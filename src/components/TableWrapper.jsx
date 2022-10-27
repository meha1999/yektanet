import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Table from "./Table";

import Bst from "../utils/bst";
import jsonData from "../data/data.json";

const TableWrapper = () => {
  let [URLSearchParams, setSearchParams] = useSearchParams({});
  const [data, setData] = useState(jsonData);
  const [dateSearch, setDateSearch] = useState("");
  const [bstData, setBstData] = useState({});

  const handleSubmitUrl = (data, key) => {
    !data ? URLSearchParams.delete(key) : URLSearchParams.set(key, data);
    setSearchParams(URLSearchParams);
  };

  const bst = new Bst();

  useEffect(() => {
    jsonData.map((item) => bst.insert(item));
  }, []);

  useEffect(() => {
    if (dateSearch) {
      setData(bst.find(dateSearch, bstData));
      ["name", "title", "field"].map((item) => URLSearchParams.delete(item));
      setSearchParams(URLSearchParams);
    } else {
      setData(jsonData);
    }
  }, [dateSearch]);

  useEffect(() => {
    bst.root && setBstData(bst.root);
  }, [bst.root]);

  const handleSearchByFields = (searchData) => {
    let finalData = [...jsonData];
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
    handleSearchByFields(["name", "title", "field"]);
  }, [
    URLSearchParams.get("name"),
    URLSearchParams.get("title"),
    URLSearchParams.get("field"),
  ]);

  return (
    <div className="table-wrapper">
      <div className="sort-wrapper">
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
