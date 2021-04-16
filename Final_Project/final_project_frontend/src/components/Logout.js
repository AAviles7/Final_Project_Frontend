import { useEffect } from "react";

const Logout = ({ history, logout }) => {
  useEffect(() => {
    logout();
    history.push("/login");
  }, [history, logout]);

  return null;
}

export default Logout;