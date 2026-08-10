import React from "react";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full">
      <ul className="text-primary flex items-center gap-1 text-sm leading-6 font-medium uppercase">
        <li>
          <Link to="/">Home</Link>
        </li>

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          const route = "/" + paths.slice(0, index + 1).join("/");

          return (
            <div className="flex items-center" key={route}>
              <li>/</li>

              <li>
                {isLast ? (
                  path.replace(/-/g, " ")
                ) : (
                  <Link to={route}>{path.replace(/-/g, " ")}</Link>
                )}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
