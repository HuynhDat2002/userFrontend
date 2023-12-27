export const base_url="http://localhost:5000/api/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

//const authState = useSelector((state)=>state?.auth?.user)
export const config2 =(auth)=> {
  return{

    headers: {
      Authorization: `Bearer ${
        auth !== null ? auth : ""
      }`,
      Accept: "application/json",
    }
  }

  
};


