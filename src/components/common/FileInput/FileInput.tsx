import React, {
  useState,
  useLayoutEffect,
  useCallback,
  ChangeEvent,
} from "react";
import { FileContent, TextField } from "shared-styles/InputFields.styles";
import { Divider } from "shared-styles/StyledComponents.styles";
import Button from "../Button/Button";

interface Props {
  filename?: string;
  file_content?: string;
  getAllFiles: (
    file_id: number,
    filename: string,
    file_content: string
  ) => void;
  file_id: number;
  submit: boolean;
  removeFile: (file_id: number) => void;
}

const FileInput: React.FC<Props> = ({
  filename: filename_prop,
  file_content: file_content_prop,
  getAllFiles,
  file_id,
  submit,
  removeFile,
}) => {
  // States
  const [filename, setFilename] = useState<string>(filename_prop || "");
  const [file_content, setFile_content] = useState<string>(
    file_content_prop || ""
  );

  // UseLayoutEffects
  useLayoutEffect(() => {
    if (submit) {
      getAllFiles(file_id, filename, file_content);
    }
  }, [submit]);

  //Functions
  const handleFileNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => setFilename(e.target.value),
    []
  );

  const handleFileContentChange = useCallback((e: any): void => {
    setFile_content(e.target.value);
  }, []);

  const handleRemoveFile = (): void => {
    removeFile(file_id);
  };

  //Rendering
  return (
    <>
      <TextField
        type="text"
        name={`filename${file_id}`}
        id={`filename${file_id}`}
        placeholder="Enter file name..."
        onChange={handleFileNameChange}
        value={filename}
        autoComplete="off"
      />
      <FileContent
        name={`file_content${file_id}`}
        id={`file_content${file_id}`}
        cols={30}
        rows={10}
        placeholder="Enter File Content..."
        onChange={handleFileContentChange}
        value={file_content}
        autoComplete="off"
      />
      <Button
        danger={true}
        type="primary"
        htmlType="button"
        onClick={handleRemoveFile}
      >
        Remove
      </Button>
      <Divider>File End</Divider>
    </>
  );
};

export default FileInput;
