import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function LoadingModal({ show }) {
  if (!show) {
    return null;
  }

  return (
    <div className="loading-modal">
      <div className="loading-content">Loading...</div>
    </div>
  );
}

export default function App() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "id":
        setId(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (event) => {
    if (id === "" || password === "") {
      alert("Submit 이벤트가 중단되었습니다.");
      event.preventDefault();
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        id: id,
        pw: password,
      });

      console.log("data");
      console.log(response.data);
    } catch (error) {
      console.log("error");
      console.log(error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <div className="App">
      <div>
        <div className="input-container">
          <label htmlFor="id">아이디</label>
          <input name="id" value={id} onChange={handleChange} />
        </div>

        <div className="input-container">
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value={"로그인"}
          onClick={handleClick}
          disabled={isLoading}
        />
        <LoadingModal show={isLoading} />
      </div>
    </div>
  );
}