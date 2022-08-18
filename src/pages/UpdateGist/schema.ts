import * as yup from "yup";

export const updateGistSchema = yup.object().shape({
  description: yup.string().required("Enter Gist Description"),
  files: yup
    .array()
    .of(
      yup.object().shape({
        filename: yup.string().required("Enter File Name"),
        content: yup.string().required("Enter File Content"),
      })
    )
    .min(1, "Atleast One File is Required"),
});
