import React, { useEffect, useState } from "react";

import thedata from "../data/data.json";
import Bst from "../utils/bst";
import { quickSort } from "../utils/quickSort";
import Table from "./Table";

const TableWrapper = () => {
  const [data, setData] = useState(thedata);
  const [dateSearch, setDateSearch] = useState("");
  const [bstData, setBstData] = useState({});
  const [updated, setUpdated] = useState(false);

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
            onChange={(e) => setDateSearch(e.target.value)}
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
        <Table data={data} setData={setData} />
      </div>
    </div>
  );
};

export default TableWrapper;
