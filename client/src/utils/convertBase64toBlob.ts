export const base64toBlob = async (
  dataUrl: string,
  fileName: string = "blobImage"
): Promise<File> => {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
};

// export const base64toBlob = (data: string) => {
//     // Cut the prefix `data:application/pdf;base64` from the raw base 64
//     const base64WithoutPrefix = data.slice('data:application/pdf;base64,'.length);

//     const bytes = atob(base64WithoutPrefix);
//     let length = bytes.length;
//     const out = new Uint8Array(length);

//     while (length--) {
//       out[length] = bytes.charCodeAt(length);
//     }

//     return new Blob([out], { type: 'application/pdf' });
//   };
