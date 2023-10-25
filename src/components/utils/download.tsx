export const downloadTxtFile = (txtValue: string, fileName: string) => {
  const element = document.createElement("a");
  const file = new Blob([txtValue], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
