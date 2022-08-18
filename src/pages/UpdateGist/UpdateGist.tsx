import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  GistFile,
  GistFormFileTypes,
  GistFormTypes,
  GistResponseTypes,
  RouterHOCTypes,
} from "types";
import { getGist, updateAGist } from "api/gist.service";
import Button from "components/common/Button/Button";
import FileInput from "components/common/FileInput/FileInput";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import { TextField } from "shared-styles/InputFields.styles";
import { UpdateGistForm } from "./UpdateGist.styles";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateGistSchema } from "./schema";
import { InputErrorsMessage } from "shared-styles/StyledComponents.styles";
interface Props {
  router: RouterHOCTypes;
}

const UpdateGist: React.FC<Props> = ({ router: { params }, router }) => {
  // Data Variables
  const defaultValues = {
    description: "",
    files: [{ filename: "", content: "" }],
  };
  // States
  const [removedFiles, setRemovedFiles] = useState([]);
  // React Hook Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<GistFormTypes>({
    resolver: yupResolver(updateGistSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<
    GistFormTypes,
    "files",
    "id"
  >({
    name: "files",
    control,
  });
  // useLayoutEffects
  useLayoutEffect(() => {
    if (params?.gist_id) {
      updateFields(params?.gist_id);
    }
  }, [params?.gist_id]);

  const updateFields = useCallback(
    async (id: string) => {
      const response = await getGist(id);
      const { files, description }: GistResponseTypes = response;
      const data_input_files: GistFile[] = [];
      for (const [filename, { content }] of Object.entries(files)) {
        data_input_files.push({
          filename,
          content,
        });
      }
      reset({ description, files: data_input_files });
    },
    [params?.gist_id]
  );

  // Functions

  const handleFormSubmit = useCallback(
    async (data: any) => {
      const files_array = [...data.files, ...removedFiles];
      console.log("Removed", removedFiles);
      let files = {};

      files_array.forEach((fileItem: GistFormFileTypes) => {
        const { filename, content } = fileItem;
        files = { ...files, [filename]: { content } };
      });
      console.log({ ...data, files });
      const response = await updateAGist({
        ...data,
        files,
        gist_id: params?.gist_id,
      });
      if (response) {
        router.navigate(`/profile/${process.env.USERNAME}`);
      }
    },
    [removedFiles]
  );

  const handleAddFileInput = useCallback(() => {
    append({ filename: "", content: "" });
  }, []);

  const removeFile = useCallback(
    (i: number, id: string) => {
      const selected_file = fields.find((file) => file.id === id);
      setRemovedFiles((files) => [...files, { ...selected_file, content: "" }]);
      remove(i);
    },
    [fields]
  );

  const renderFileInputFields = () => {
    return fields.map((field, i) => {
      return (
        <FileInput
          key={field.id}
          id={field.id}
          index={i}
          control={control}
          register={register}
          removeFile={removeFile}
          field={field}
          errors={errors}
        />
      );
    });
  };

  return (
    <UpdateGistForm onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="description"
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            placeholder="Description"
            autoComplete="off"
          />
        )}
        control={control}
      />
      <InputErrorsMessage>
        {errors?.description && errors.description?.message}
      </InputErrorsMessage>

      {renderFileInputFields()}
      <Button type="primary" htmlType="button" onClick={handleAddFileInput}>
        Add File
      </Button>
      <Button htmlType="submit" type="primary" block>
        Create Gist
      </Button>
    </UpdateGistForm>
  );
};

export default withRouter(withAuth(UpdateGist));
