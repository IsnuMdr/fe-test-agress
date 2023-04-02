import { useState } from "react";

const parse = require("html-react-parser");

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      {isReadMore ? parse(text.substring(0, 100)) : parse(text)}
      {text.length > 200 && (
        <span onClick={toggleReadMore} className="text-blue-600 cursor-pointer">
          {isReadMore ? " ...read more" : " show less"}
        </span>
      )}
    </>
  );
};

export default ReadMore;
