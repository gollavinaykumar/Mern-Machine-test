import { useState } from "react";
import Header from "./Header";
import { createUser } from "../services/signUpService";
import { message } from "antd";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function onSignup() {
    const creatingUser = await createUser({
      name: username,
      email,
      password,
    }).then(() => {
      message.success("signup success");
    });
    console.log(creatingUser);
  }
  return (
    <div style={{ border: "1px solid black", margin: 5 }}>
      <Header />
      <div style={{ textAlign: "center", height: 200 }}>
        <label>User Name : </label>
        <input
          type="text"
          style={{ margin: 5, padding: 5 }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <label>Email : </label>
        <input
          type="email"
          style={{ margin: 5, padding: 5 }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          style={{ margin: 5, padding: 5 }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input
          type="button"
          value="SignUp"
          style={{ margin: 5, padding: 5 }}
          onClick={onSignup}
        />
      </div>
    </div>
  );
}
