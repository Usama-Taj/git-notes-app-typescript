import Loader from "components/common/Loader/Loader";
import React, { useMemo } from "react";
import { Table } from "./GridFileView.styles";

interface Props {
  fileContent?: string[];
}

const GridFileView: React.FC<Props> = ({ fileContent }) => {
  const renderFileContent = useMemo(() => {
    const fileData = fileContent.slice(0, 10);
    if (Array.isArray(fileData)) {
      let content = fileData;
      if (fileData.length < 10) {
        content = [
          ...fileData,
          ...Array(Math.abs(fileData.length - 10)).fill("\n"),
        ];
      }
      return content.map((item, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.length > 30 ? item.substring(0, 30) + "..." : item}</td>
        </tr>
      ));
    }
    return null;
  }, [fileContent]);
  if (!fileContent.length) {
    return <Loader loading={!fileContent.length} />;
  }
  return (
    <Table>
      <tbody>{renderFileContent}</tbody>
    </Table>
  );
};

export default GridFileView;
