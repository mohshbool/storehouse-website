import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch } from "react-redux";
import { updateConfigs, setUser } from "../Action";
import { apiRequest } from "../API";
import { User } from "../API/types";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setLoading(true);
        apiRequest<User>({
          url: "/user/login",
          method: "POST",
          data: values,
        })
          .then((res) => {
            dispatch(updateConfigs({ signedIn: true }));
            dispatch(setUser(res));
          })
          .catch((error) => {
            console.log(error.response);
            setErrMsg(error.response.data.message);
            setOpen(true);
            setLoading(false);
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
            <Button variant="text" onClick={() => navigate("register")}>
              Sign up
            </Button>
            <LoadingButton loading={loading} variant="contained" type="submit">
              Login
            </LoadingButton>
          </Box>
        </Box>
      </AuthContainer>
    </React.Fragment>
  );
};

export const AuthContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default LoginContainer;
