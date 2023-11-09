// icon:pages | System UIcons https://systemuicons.com/ | Corey Ginnivan
import { SVGProps } from "react";

function IconPages(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 3.5h-7a2 2 0 00-2 2v9a2 2 0 002 2h7a2 2 0 002-2v-9a2 2 0 00-2-2z" />
        <path d="M6.5 5.5a2 2 0 00-2 2v8a3 3 0 003 3h6a2 2 0 002-2" />
      </g>
    </svg>
  );
}

export default IconPages;
