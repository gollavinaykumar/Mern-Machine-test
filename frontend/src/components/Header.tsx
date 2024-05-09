import { Link } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

export default function Header() {
  const loggedUser = useUserStore((s: any) => s.user);
  console.log(loggedUser);
  return (
    <div>
      <p>Logo</p>
      <div style={{ backgroundColor: "yellow" }}>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <span style={{ padding: 5 }}>Login</span>
        </Link>
        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <span style={{ padding: 5 }}>Signup</span>
        </Link>
      </div>
    </div>
  );
}
