import { useState } from "react";
import Header from "./Header";
import { checkUser } from "../services/loginServices";
import { useUserStore } from "../zustand/useUserStore";
import { useNavigate, useNavigation } from "react-router-dom";
import { message } from "antd";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((s: any) => s.setUser);
  async function onSubmit() {
    const getUser = await checkUser(name, password);
    setUser(getUser);
    if (getUser) {
      message.success("login success");
      navigate("/");
    } else {
      message.error("user not found");
    }
  }
  return (
    <div style={{ border: "1px solid black", margin: 5 }}>
      <Header />
      <form style={{ textAlign: "center", height: 200 }}>
        <label htmlFor="Email" style={{ margin: 5 }}>
          User Name:
        </label>
        <input
          type="text"
          name="Email"
          style={{ margin: 5, padding: 5 }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="password" style={{ margin: 5, padding: 5 }}>
          Password:
        </label>
        <input
          type="password"
          name="password"
          style={{ margin: 5, padding: 5 }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="button"
          value="login"
          style={{ margin: 5, padding: 5 }}
          onClick={onSubmit}
        />
      </form>
    </div>
  );
}
