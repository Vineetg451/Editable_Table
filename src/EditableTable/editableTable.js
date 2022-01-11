import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Input,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import "./editableTable.css";

const EditableTable = () => {
  const [rowData, setRowData] = useState([]);

  const tableDataRedux = useSelector((state) => {
    return state;
  });

  const tableHeading = ["Id", "First Name", "Last Name", "Email Id", "Avatar"];

  useEffect(() => {
    setRowData(tableDataRedux.data);
  }, [tableDataRedux]);

  const deleteRow = useCallback(
    (id) => {
      const copyRow = [...rowData];
      const filteredRow = copyRow.filter((row) => {
        return row.id !== id;
      });
      setRowData(filteredRow);
    },
    [rowData]
  );

  const TableColumn = useMemo(
    () =>
      ({ fieldValue, editMode, id, name, editRow }) => {
        return editMode ? (
          <Input
            key={id}
            name={name}
            onChange={(e) => {
              editRow(e, id);
            }}
            value={fieldValue}
          />
        ) : (
          <>{fieldValue}</>
        );
      },
    []
  );

  const toggleEditMode = useCallback(
    (id) => {
      const copyRow = rowData.map((row) => {
        if (row.id === id) {
          row.editMode = !row.editMode;
        }
        return row;
      });
      setRowData(copyRow);
    },
    [rowData]
  );

  const editRow = useCallback(
    (e, id) => {
      const copyRowData = [...rowData];
      const editedRowData = copyRowData.map((row) => {
        if (row.id === id) {
          row[e.target.name] = e.target.value;
        }
        return row;
      });
      setRowData(editedRowData);
    },
    [rowData]
  );

  return (
    <TableContainer sx={{ width: "60%", margin: "auto" }} component={Paper}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          margin: "20px 0px",
        }}
      >
        Persons Data
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeading.map((heading) => (
              <TableCell sx={{ fontWeight: "bold" }}>{heading}</TableCell>
            ))}

            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDataRedux.data.length > 0 &&
            rowData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="left">
                  {row.id}
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {" "}
                  <TableColumn
                    fieldValue={row.first_name}
                    name="first_name"
                    id={row.id}
                    editMode={row.editMode}
                    editRow={editRow}
                  />
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {" "}
                  <TableColumn
                    fieldValue={row.last_name}
                    name="last_name"
                    id={row.id}
                    editMode={row.editMode}
                    editRow={editRow}
                  />
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {" "}
                  <TableColumn
                    fieldValue={row.email}
                    name="email"
                    id={row.id}
                    editMode={row.editMode}
                    editRow={editRow}
                  />
                </TableCell>
                <TableCell sx={{ width: "50px" }} align="left">
                  <img src={row.avatar} alt="N/A" className="imgStyle" />
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {row.editMode ? (
                    <>
                      <Button
                        onClick={() => {
                          toggleEditMode(row.id);
                        }}
                        variant="primary"
                      >
                        <DoneIcon />
                      </Button>
                    </>
                  ) : (
                    <div className="buttondiv">
                      <Button
                        onClick={() => {
                          toggleEditMode(row.id);
                        }}
                        variant="primary"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteRow(row.id);
                        }}
                        variant="primary"
                      >
                        <DeleteIcon />
                      </Button>{" "}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {tableDataRedux.error ? (
        <div className="error">Some Error Occured</div>
      ) : null}
    </TableContainer>
  );
};
export default EditableTable;
