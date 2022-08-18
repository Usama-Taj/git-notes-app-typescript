import * as yup from "yup";

export const addGistSchema = yup.object().shape({
  description: yup.string().required("Enter Gist Description"),
  public: yup.boolean().default(true),
  files: yup
    .array()
    .of(
      yup.object().shape({
        filename: yup.string().required("Enter File Name"),
        content: yup.string().required("Enter File Content"),
      })
    )
    .min(1, "Atlear One File is Required")
    .default([{ filename: "", content: "" }]),
});
