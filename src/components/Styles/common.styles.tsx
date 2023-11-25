import { CSSProperties } from "react";

export const baseButtonStyles: CSSProperties = {
  border: "none",
};

const commonBorder: CSSProperties = {
  borderRadius: "var(--secondary-border-radius)",
  background: "#fff",
  boxShadow: "var(--div-shadow-params)",
};
export const borderStyles: CSSProperties = {
  border: "var(--global-border-thickness) solid var(--secondary-color)",
  ...commonBorder,
};

export const successBorder: CSSProperties = {
  border: "var(--global-border-thickness) solid var(--success-state)",
  ...commonBorder,
};

export const dialogStyles: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  margin: "31vh 17%",
  border: "var(--global-border-thickness) solid var(--secondary-color)",
  boxShadow: "var(--div-shadow-params)",
  borderRadius: "var(--primary-border-radius)",
  background: "#fff",
  padding: "0px 15px",
  width: "20em",
};

export const textStyles: CSSProperties = {
  height: "100px",
  width: "90%",
  border: "solid var(--secondary-color)",
  borderRadius: "var(--primary-border-radius)",
  marginBottom: "15px",
};

export const inputStyles: CSSProperties = {
  minHeight: "45px",
  transition: "border-color 0.5s var(--global-animation-style)",
};

export const dialogHeaderStyles: CSSProperties = {
  border: "none",
  borderRadius: 0,
};
