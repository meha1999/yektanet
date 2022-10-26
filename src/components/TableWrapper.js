import React, { useEffect, useState } from "react";

import thedata from "../data/data.json";
import Bst from "../utils/bst";
import Table from "./Table";

const TableWrapper = () => {
  const [data, setData] = useState(thedata);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const bstData = new Bst();

  useEffect(() => {
    thedata.map((item) => {
      bstData.insert(item);
    });
  }, []);

  useEffect(() => {
    search && setData(bstData.find(search, search2));
  }, [search]);

  useEffect(() => {
    bstData.root && setSearch2(bstData.root);
  }, [bstData.root]);

  return (
    <div className="table-wrapper">
      <div className="sorting-wrapper">
        <div className="input-sort">
          <label htmlFor="username">تام تغییر دهنده</label>
          <input type={"text"} id="username" />
        </div>
        <div className="input-sort">
          <label htmlFor="timestamp">تاریخ</label>
          <input
            type={"text"}
            id="timestamp"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="input-sort">
          <label htmlFor="ticket">نام آگهی</label>
          <input type={"text"} id="ticket" />
        </div>
        <div className="input-sort">
          <label htmlFor="field">نام فیلد</label>
          <input type={"text"} id="field" />
        </div>
      </div>
      <div>
        <Table data={data} />
      </div>
    </div>
  );
};

export default TableWrapper;
