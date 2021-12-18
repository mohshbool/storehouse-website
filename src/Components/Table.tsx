import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Modal from "@mui/material/Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiRequest } from "../API";
import { Category, Product, User } from "../API/types";
import { UserReducer } from "../Action/types";
import { useSelector } from "react-redux";
import { RootState } from "../Reducer";

const userValidationSchema = yup.object({
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
const productValidationSchema = yup.object({
  name: yup.string().min(3, "Name too short").required("Name required"),
  description: yup
    .string()
    .min(15, "Description too short")
    .required("Description is required"),
  quantity: yup.number().min(1).required("Quantity is required"),
  price: yup.number().min(0).required("Price is required"),
});
const categoryValidationSchema = yup.object({
  name: yup.string().min(3, "Name too short").required("Name required"),
});

interface TableProps {
  type: "products" | "users" | "categories" | string;
}
const Table = (props: TableProps) => {
  let columns: GridColDef[];
  const [modalOpen, setModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [variant, setVariant] = React.useState<"error" | "success">("error");
  const [data, setData] = React.useState<User[] | Product[] | Category[]>();
  const [dataLoading, setDataLoading] = React.useState(false);
  const { token } = useSelector<RootState>(
    (state) => state.User
  ) as UserReducer;
  if (props.type === "products") {
    columns = [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        minWidth: 250,
        editable: true,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        minWidth: 250,
        editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 250,
        editable: true,
      },
      {
        field: "created_date",
        headerName: "Created Date",
        type: "date",
        minWidth: 110,
        editable: true,
      },
    ];
  } else if (props.type === "users") {
    columns = [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        editable: true,
      },
      {
        field: "email",
        headerName: "E-mail",
        minWidth: 250,
        editable: true,
      },
      {
        field: "created_date",
        headerName: "Created Date",
        type: "date",
        minWidth: 110,
        editable: true,
      },
    ];
  } else {
    columns = [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        editable: true,
      },
      {
        field: "created_date",
        headerName: "Created Date",
        minWidth: 110,
        type: "date",
        editable: true,
      },
    ];
  }

  const typeForServer =
    props.type === "users" || props.type === "products"
      ? props.type.slice(0, -1)
      : "category";

  React.useEffect(() => {
    setDataLoading(true);
    apiRequest<User[] | Product[] | Category[]>({
      url: `/${typeForServer}/all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res);
        setDataLoading(false);
      })
      .catch((error) => {
        setVariant("error");
        setMsg(error.response.data.message);
        setOpen(true);
        setDataLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues:
        props.type === "users"
          ? {
              name: "",
              email: "",
              password: "",
            }
          : props.type === "products"
          ? {
              name: "",
              description: "",
              quantity: 1,
              price: 1,
            }
          : {
              name: "",
            },
      validationSchema:
        props.type === "users"
          ? userValidationSchema
          : props.type === "products"
          ? productValidationSchema
          : categoryValidationSchema,
      onSubmit: (values) => {
        setLoading(true);
        apiRequest<User>({
          url: `/${typeForServer}/create`,
          method: "POST",
          data: values,
        })
          .then((res) => {
            setMsg(`${res.name} has been created`);
            setVariant("success");
          })
          .catch((error) => {
            setVariant("error");
            setMsg(error.response.data.message);
            setOpen(true);
            setLoading(false);
          });
      },
    });

  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        {!data && dataLoading ? (
          <Box
            sx={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          data && (
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              checkboxSelection
              autoHeight
              disableSelectionOnClick
            />
          )
        )}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={variant}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new{" "}
            {props.type === "users" || props.type === "products"
              ? props.type.charAt(0).toUpperCase() + props.type.slice(1, -1)
              : "Category"}
          </Typography>
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
            {props.type === "users" ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : props.type === "products" ? (
              <React.Fragment>
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
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.quantity && Boolean(errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginX: 1,
                marginTop: 3,
              }}
            >
              <LoadingButton
                loading={loading}
                sx={{ width: "100%" }}
                variant="contained"
                type="submit"
              >
                Add
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Fab
        sx={{ position: "fixed", right: 20, bottom: 20 }}
        color="primary"
        aria-label="add"
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default Table;
