const initialState = { data: [], error: null, loading: false };

export const getTableDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TABLE_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false,
      };
    case "GET_TABLE_DATA_FAILURE":
      return {
        ...state,
        data: [],
        loading: false,
        error: state.error,
      };
    case "GET_TABLE_DATA_STARTED":
      return {
        ...state,
        data: [],
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};
