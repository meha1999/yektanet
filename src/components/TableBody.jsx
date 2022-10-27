import { useState } from "react";

const TableBody = ({ data }) => {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("Bookmarks")) || []
  );

  const handleBookmark = (id) => {
    const finalBookmarks = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];
    localStorage.setItem("Bookmarks", JSON.stringify(finalBookmarks));
    setBookmarks(finalBookmarks);
  };

  return (
    <tbody>
      {data?.map((item, index) => (
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
  );
};

export default TableBody;
