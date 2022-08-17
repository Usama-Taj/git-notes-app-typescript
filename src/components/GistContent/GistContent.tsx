import CodeCard from "components/common/CodeCard/CodeCard";
import React, { useMemo } from "react";
import { Content, Table } from "./GistContent.styles";

interface Props {
  filename: string;
  fileContent?: string[];
}

const GistContent: React.FC<Props> = ({ filename, fileContent }) => {
  const renderFileContent = useMemo(() => {
    if (Array.isArray(fileContent)) {
      return (
        <tbody>
          {fileContent.map((item, i) => (
            <tr key={i}>
              <td>
                <b>{i + 1}</b>
              </td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      );
    }
    return null;
  }, [fileContent]);

  return (
    <Content>
      <CodeCard title={filename}>
        <Table>{renderFileContent}</Table>
      </CodeCard>
    </Content>
  );
};

export default GistContent;
