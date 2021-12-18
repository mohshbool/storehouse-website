import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContainer } from "./Login";
import { useNavigate } from "react-router-dom";
import { User } from "../API/types";
import { apiRequest } from "../API";
import { useDispatch } from "react-redux";
import { setUser, updateConfigs } from "../Action";

const validationSchema = yup.object({
  name: yup.string().min(3, "Name too short").required("Name required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignupContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
        apiRequest<User>({
          url: "/user/create",
          method: "POST",
          data: values,
        })
          .then((res) => {
            dispatch(updateConfigs({ signedIn: true }));
            dispatch(setUser(res));
            navigate("/");
          })
          .catch((error) => {
            console.log(error.response);
            setErrMsg(error.response.data.message);
            setOpen(true);
          });
      },
    });

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
      <AuthContainer>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": {
              m: 1,
              width: "25ch",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            id="email"
            name="email"
            label="E-mail"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginX: 1,
              marginTop: 3,
            }}
          >
            <Button variant="text" onClick={() => navigate("/")}>
              Login
            </Button>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </Box>
        </Box>
      </AuthContainer>
    </React.Fragment>
  );
};

export default SignupContainer;
