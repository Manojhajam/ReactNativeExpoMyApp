import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

export default validationSchema;
