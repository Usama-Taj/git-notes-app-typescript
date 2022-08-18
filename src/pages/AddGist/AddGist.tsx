import React, { useCallback } from "react";
import { GistFormFileTypes, GistFormTypes, RouterHOCTypes } from "types";
import { createAGist } from "api/gist.service";
import Button from "components/common/Button/Button";
import FileInput from "components/common/FileInput/FileInput";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import { TextField, GistTypeSwitch } from "shared-styles/InputFields.styles";
import { AddGistForm } from "./AddGist.styles";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addGistSchema } from "./schema";
import { InputErrorsMessage } from "shared-styles/StyledComponents.styles";
interface Props {
  router: RouterHOCTypes;
}

const AddGist: React.FC<Props> = ({ router }) => {
  // Data Variables
  const defaultValues = {
    description: "",
    files: [{ filename: "", content: "" }],
  };
  // React Hook Forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<GistFormTypes>({
    resolver: yupResolver(addGistSchema),
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
  // Functions

  const handleFormSubmit = useCallback(async (data: any) => {
    let files = {};

    data.files.forEach((fileItem: GistFormFileTypes) => {
      const { filename, content } = fileItem;
      files = { ...files, [filename]: { content } };
    });
    const response = await createAGist({ ...data, files });
    if (response) {
      router.navigate(`/profile/${process.env.USERNAME}`);
    }
  }, []);

  const handleAddFileInput = useCallback(() => {
    append({ filename: "", content: "" });
  }, []);

  const removeFile = useCallback((i: number) => {
    remove(i);
  }, []);

  const renderFileInputFields = () => {
    return fields.map((field, i) => {
      return (
        <FileInput
          key={field.id}
          index={i}
          id={field.id}
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
    <AddGistForm onSubmit={handleSubmit(handleFormSubmit)}>
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
      <Controller
        name="public"
        control={control}
        render={({ field }) => (
          <GistTypeSwitch
            {...field}
            checked={field.value}
            checkedChildren="Public"
            unCheckedChildren="Private"
            defaultChecked
          />
        )}
      />
      <InputErrorsMessage>
        {errors?.public && errors.public?.message}
      </InputErrorsMessage>

      {renderFileInputFields()}
      <Button type="primary" htmlType="button" onClick={handleAddFileInput}>
        Add File
      </Button>
      <Button htmlType="submit" type="primary" block>
        Create Gist
      </Button>
    </AddGistForm>
  );
};

export default withRouter(withAuth(AddGist));
