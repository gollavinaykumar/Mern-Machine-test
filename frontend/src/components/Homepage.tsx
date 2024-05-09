import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";
import { useEffect } from "react";
import { message } from "antd";

export default function Homepage() {
  const user = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user[0].id) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <HomeHeader title="Dashboard" />
      <h1 style={{ textAlign: "center" }}>Welcome to Admin panel</h1>
    </>
  );
}

export function HomeHeader({ title }: any) {
  const user = useUserStore((s: any) => s.user);
  const setUser = useUserStore((s: any) => s.setUser);
  return (
    <div style={{ margin: 5 }}>
      <p>Logo</p>
      <div
        style={{
          backgroundColor: "lightgray",
          display: "flex",
          flexDirection: "row",
          height: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <span style={{ padding: 5 }}>Home</span>
        </Link>
        <Link
          to={"/new"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <span style={{ padding: 5 }}>create employee</span>
        </Link>
        <Link
          to={"/employees"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <span style={{ padding: 5 }}>employees list</span>
        </Link>
        <span style={{ padding: 5 }}>{user[0].name}</span>

        <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
          <span
            style={{ padding: 5 }}
            onClick={() => {
              setUser({});
              message.success("logout successfully");
            }}
          >
            Logout
          </span>
        </Link>
      </div>
      <p style={{ backgroundColor: "yellow" }}>{title}</p>
    </div>
  );
}
