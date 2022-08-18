import React from "react";
import {
  UseFormRegister,
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
} from "react-hook-form";
import { FileContent, TextField } from "shared-styles/InputFields.styles";
import {
  Divider,
  InputErrorsMessage,
} from "shared-styles/StyledComponents.styles";
import { GistFormFileTypes, GistFormTypes } from "types";
import Button from "../Button/Button";

interface Props {
  register: UseFormRegister<GistFormTypes>;
  control: Control<GistFormTypes>;
  index: number;
  id: string;
  removeFile: (i: number, id: string) => void;
  field: FieldArrayWithId<GistFormFileTypes>;
  errors: FieldErrors<GistFormTypes>;
}

const FileInput: React.FC<Props> = ({
  control,
  index,
  removeFile,
  errors,
  id,
}) => {
  //Functions
  const handleRemoveFile = (): void => {
    removeFile(index, id);
  };

  //Rendering
  return (
    <>
      <Controller
        name={`files.${index}.filename`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            placeholder="Enter file name..."
            autoComplete="off"
            danger={
              errors?.files &&
              errors?.files[index]?.filename &&
              (!!errors?.files[index]?.filename).toString()
            }
          />
        )}
      />
      <InputErrorsMessage>
        {errors?.files &&
          errors?.files[index] &&
          errors?.files[index]?.filename?.message}
      </InputErrorsMessage>
      <Controller
        name={`files.${index}.content`}
        control={control}
        render={({ field }) => (
          <FileContent
            {...field}
            cols={30}
            rows={10}
            placeholder="Enter File Content..."
            autoComplete="off"
            danger={
              errors?.files &&
              errors?.files[index]?.content &&
              (!!errors?.files[index]?.content).toString()
            }
          />
        )}
      />
      <InputErrorsMessage>
        {errors?.files &&
          errors?.files[index] &&
          errors?.files[index]?.content?.message}
      </InputErrorsMessage>

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
