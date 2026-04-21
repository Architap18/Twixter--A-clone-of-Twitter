import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
//signup
    if (isSignup) {
      if (!name || !email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      const userData = { name, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } else {
//login
      const saved = JSON.parse(localStorage.getItem("user"));
      if (!saved) {
        setError("No account found. Please sign up first.");
        return;
      }
      if (saved.email !== email || saved.password !== password) {
        setError("Incorrect email or password.");
        return;
      }
      navigate("/");
    }
  };
  return (
  <div className="auth-page">
    
    {/* left */}
    <div className="auth-left">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" className="logo-img" />
        <h1 className="brand-text">Twixter</h1>
      </div>

      <h2 className="hero-text"> Real-time conversations.<br /> Real people. Real moments.</h2>
      <p className="sub-text">Join the conversation. Stay updated. Share your thoughts.</p>
    </div>

    {/* right */}
    <div className="auth-right">
      <div className="auth-card">
        <h2>{isSignup ? "Create your account" : "Sign in to Twixter"}</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="divider">or</div>

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="toggle-text">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
          >
            {isSignup ? " Sign in" : " Sign up"}
          </span>
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;