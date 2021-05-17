//@ts-check
import useDidMount from "hooks/useDidMount";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 *
 * @param {string} path
 */

const usePageSaver = (path) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace("/", "");
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.movxPage ? JSON.parse(localStorage.movxPage)[p] : 1
  );
  const didMount = useDidMount();

  useLayoutEffect(() => {
    if (localStorage.movxPage) {
      const movxPage = JSON.parse(localStorage.getItem("movxPage"));
      const page = movxPage[p];

      if (typeof movxPage[p] !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        "movxPage",
        JSON.stringify({
          [p]: currentPage,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (didMount) {
      const movxPage = JSON.parse(localStorage.getItem("movxPage"));

      localStorage.setItem(
        "movxPage",
        JSON.stringify({
          ...movxPage,
          [p]: currentPage,
        })
      );
    }
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
