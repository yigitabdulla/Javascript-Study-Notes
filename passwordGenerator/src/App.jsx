import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    number: "1234567890",
    special: "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~",
  };

  const generatePassword = () => {
    let chars = "";
    let requiredChars = [];
    let pw = "";

    // Ensure at least one character from each selected type
    Object.keys(options).forEach((key) => {
      if (options[key]) {
        chars += charSets[key];
        requiredChars.push(charSets[key][Math.floor(Math.random() * charSets[key].length)]);
      }
    });

    if (!chars) return alert("Cannot generate password! Select at least one option.");
    if (length < 10 || length > 40) return alert("Length must be between 10 and 40.");

    // Generate remaining characters
    for (let i = requiredChars.length; i < length; i++) {
      pw += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle the password to mix required characters
    pw = [...requiredChars, ...pw].sort(() => Math.random() - 0.5).join("");

    setPassword(pw);
  };

  const handleOptionChange = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="main-container">
      <div className="checkbox-container">
        {Object.keys(options).map((key) => (
          <div key={key} className="checkboxes">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="checkbox"
              name={key}
              checked={options[key]}
              onChange={() => handleOptionChange(key)}
            />
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="btn" onClick={generatePassword}>Generate Password</button>
        <button className="btn" onClick={() => setPassword("")}>Clear Password</button>
      </div>

      <div className="password-container">
        <input placeholder="Password" value={password} readOnly className="passwordInput" />
        <input
          placeholder="Length"
          type="number"
          value={length}
          onChange={(e) => setLength(Math.max(10, Math.min(40, Number(e.target.value))))}
          className="passwordInput"
          min={10}
          max={40}
        />
        <button onClick={() => navigator.clipboard.writeText(password)}>Copy</button>
      </div>
    </div>
  );
}

export default App;
