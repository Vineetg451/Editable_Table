import { getTableData } from "../../apis/apis";

export const getTableDataAction = () => (dispatch) => {
  dispatch(getTableDataStarted());
  getTableData()
    .then((res) => {
      dispatch(getTableDataSuccess(res));
    })
    .catch((error) => {
      dispatch(getTableDataFailure(error));
    });
};

const getTableDataSuccess = (tableData) => ({
  type: "GET_TABLE_DATA_SUCCESS",
  payload: {
    ...tableData,
  },
});

const getTableDataStarted = () => ({
  type: "GET_TABLE_DATA_STARTED",
});

const getTableDataFailure = (error) => ({
  type: "GET_TABLE_DATA_FAILURE",
  payload: {
    error,
  },
});
