import { navigate } from "svelte-routing";

export const checkToken = () => {
  if (localStorage.getItem("access_token")) {
    navigate("/", { replace: true });
  } else {
    navigate("/login", { replace: true });
  }
};
console.log(navigate);