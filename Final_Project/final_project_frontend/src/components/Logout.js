import { useEffect } from "react";

const Logout = ({ history, logout }) => {
  useEffect(() => {
    logout();
    history.push("/login");
  }, []);

  return null;
}

export default Logout;