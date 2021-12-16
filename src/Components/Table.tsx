import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
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
    minWidth: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "Snow, Jon",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 2,
    name: "Lannister, Cersei",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 3,
    name: "Lannister, Jaime",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 4,
    name: "Stark, Arya",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 5,
    name: "Targaryen, Daenerys",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 6,
    name: "Melisandre",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 7,
    name: "Clifford, Ferrara",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 8,
    name: "Frances, Rossini",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
  {
    id: 9,
    name: "Roxie, Harvey",
    email: "example@company.com",
    created_date: "24/10/2008",
  },
];

interface TableProps {
  labels?: string[];
  data?: number[];
  title?: string;
  lineColor?: string;
}
const Table = (props: TableProps) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
