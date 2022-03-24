export const fileToDataUrl = async (file: File) => {
  return new Promise<string>((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      resolve(e.target?.result as string);
    };
  });
};
