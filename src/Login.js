import { useState } from "react";
import { loginAsUser, config } from "shared-remote-utils";

export default function LoginPage({onLogin}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function login() {
    const res = await loginAsUser(password, username);
    if (res.status === 200) {
      // console.log(res.body.accessToken);
      alert("logged in succesfully");
      await config.saveToken(res.body.accessToken);
      onLogin(true);
    } else {
      alert(res.body)
    }
  }

  return (
    <div style={{ flexDirection: "column" }}>
      <div>
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}