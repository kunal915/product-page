import React from "react";
import Routing from "./utils/Routing";
import { Link, useLocation } from "react-router-dom";

function App() {
  const { search, pathname } = useLocation();
  // console.log(`search = ` + search.length, `pathname = ` + pathname);

  return (
    <div className="h-full w-full relative">
      
      {(pathname != "/" || search.length > 0) && (
        <Link to="/" className="absolute z-10 top-px left-[16%] text-red-300">
          Home
        </Link>
      )}

      <Routing />
    </div>
  );
}

export default App;
