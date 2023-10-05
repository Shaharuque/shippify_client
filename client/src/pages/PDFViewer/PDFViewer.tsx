import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PDFViewer = () => {
  const selectedLabelData = useSelector((state: any) => state.label.labelData);
  const selectedBlobData = useSelector((state: any) => state.label.bolData);
  console.log(selectedLabelData);

  const [height, setHeight] = useState<number>(200);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <div>
      {
        selectedLabelData === "" ?
          <iframe src={`data:application/pdf;base64,${selectedBlobData}`} onLoad={() => {
            console.log("loading");
          }} width="100%" height={height}></iframe>
          // <img style={{
          //   height: "800px",
          //   width: "800px"
          // }} src={`data:image/jpeg;base64,${selectedBlobData}`} />
          :
          <iframe src={selectedLabelData} onLoad={() => {
            console.log("loading");
          }} width="100%" height={height}></iframe>
      }
    </div>
  );
};

export default PDFViewer;