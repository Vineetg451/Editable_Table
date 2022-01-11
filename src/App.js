import "./App.css";
import EditableTable from "./EditableTable/editableTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTableDataAction } from "./redux/actions/action";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTableDataAction());
  }, []);
  return <EditableTable />;
}

export default App;
