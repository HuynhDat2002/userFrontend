import { useDispatch, useSelector } from "react-redux";
export const base_url="http://localhost:5000/api/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

//const authState = useSelector((state)=>state?.auth?.user)
export const config =(auth)=> {
  return{

    headers: {
      Authorization: `Bearer ${
        auth !== null ? auth.token : ""
      }`,
      Accept: "application/json",
    }
  }

  
};


