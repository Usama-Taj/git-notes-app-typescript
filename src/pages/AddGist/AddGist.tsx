import React, { useCallback, useMemo, useState } from "react";
import { GistFile, GistTypes, RouterHOCTypes } from "types";
import { createAGist } from "api/gist.service";
import Button from "components/common/Button/Button";
import FileInput from "components/common/FileInput/FileInput";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import { TextField, GistTypeSwitch } from "shared-styles/InputFields.styles";
import { AddGistForm } from "./AddGist.styles";

interface Props {
  router: RouterHOCTypes;
}

const AddGist: React.FC<Props> = ({ router }) => {
  // Data Variables
  // States
  const [gist_description, setGist_description] = useState("");
  const [file_counter, setFile_counter] = useState(1);
  const [input_files, setInput_files] = useState<GistFile[]>([{ file_id: 1 }]);
  const [type_public, setType_public] = useState(true);
  const [submit, setSubmit] = useState(false);
  // Functions

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      let files = {};
      input_files.forEach((fileItem) => {
        const { filename, file_content: content } = fileItem;
        files = { ...files, [filename]: { content } };
      });
      const data_obj: GistTypes = {
        description: gist_description,
        files,
        public: type_public,
      };
      const response = await createAGist(data_obj);
      if (response) {
        router.navigate(`/profile/${process.env.USERNAME}`);
      }
    },
    [gist_description, input_files, file_counter, type_public]
  );

  const handleSubmitClick = useCallback(() => {
    setSubmit(true);
  }, [submit]);

  const handleDescChange = useCallback(
    (e: any) => {
      setGist_description(e.target.value);
    },
    [gist_description]
  );

  const handleCheck = useCallback(
    (checked: boolean) => {
      setType_public(checked);
    },
    [type_public]
  );

  const handleAddFileInput = useCallback(() => {
    setInput_files((input_files) => [
      ...input_files,
      { file_id: file_counter + 1 },
    ]);
    setFile_counter(file_counter + 1);
  }, [input_files, file_counter]);

  const getAllFiles = useCallback(
    (file_id: number, filename: string, file_content: string) => {
      setInput_files((input_files) => {
        const filtered_input_files = input_files.filter(
          (file) => file.file_id !== file_id
        );
        const new_file = {
          file_id,
          filename,
          file_content,
        };
        return [...filtered_input_files, new_file];
      });
    },
    [input_files]
  );
  const removeFile = useCallback(
    (file_id: number) => {
      if (file_counter > 1) {
        setInput_files(input_files.filter((file) => file.file_id !== file_id));
      }
    },
    [file_counter, input_files]
  );

  const renderFileInputFields = useMemo(() => {
    return input_files.map(({ file_id }) => (
      <FileInput
        key={file_id}
        file_id={file_id}
        getAllFiles={getAllFiles}
        removeFile={removeFile}
        submit={submit}
      />
    ));
  }, [input_files, submit]);

  return (
    <AddGistForm onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={gist_description}
        onChange={handleDescChange}
        autoComplete="off"
      />
      <GistTypeSwitch
        checkedChildren="Public"
        unCheckedChildren="Private"
        defaultChecked
        onChange={handleCheck}
        checked={type_public}
      />
      {renderFileInputFields}
      <Button type="primary" htmlType="button" onClick={handleAddFileInput}>
        Add File
      </Button>
      <Button
        htmlType="submit"
        type="primary"
        block
        onClick={handleSubmitClick}
      >
        Create Gist
      </Button>
    </AddGistForm>
  );
};

export default withRouter(withAuth(AddGist));
