import axios from "axios";

export const getTableData = async () => {
  const { data } = await axios.get("https://reqres.in/api/users?page=1");
  return data;
};
