import { useState } from "react";

import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const send = () => {
    axios.post("/email", {email: email});
  }

  return <section className="top container">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button onClick={() => send()}>ggggggggggg</button>
  </section>
}

export { Forgot };