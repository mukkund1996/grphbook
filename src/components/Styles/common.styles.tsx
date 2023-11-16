import { CSSProperties } from "react";

export const baseButtonStyles: CSSProperties = {
  border: "none",
};

export const borderStyles: CSSProperties = {
  border: "3px solid var(--secondary-color)",
  borderRadius: "10px",
  background: "#fff",
};

export const dialogStyles: CSSProperties = {
  position: "fixed",
  left: 0,
  margin: "35vh 18%",
  border: "3px solid var(--secondary-color)",
  borderRadius: "5px",
  background: "#fff",
  padding: "0px 15px",
  width: "20em",
};

export const textStyles: CSSProperties = {
  height: "100px",
  width: "90%",
  border: "solid var(--secondary-color)",
  borderRadius: "5px",
  marginBottom: "15px",
};

export const inputStyles: CSSProperties = {
  minHeight: "45px",
};

export const dialogHeaderStyles: CSSProperties = {
  border: "none",
  borderRadius: 0,
};
