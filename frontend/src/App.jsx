import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import AITutor from "./components/AITutor";
import LandingPage from "./pages/landingpage";
import Courses from "./pages/Courses";
import Playground from "./pages/Playground";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetails from "./pages/CourseDetails";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [error, setError] = useState("");

    const login = async () => {
        try {
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            const accessToken = data.data.token;

            localStorage.setItem(
                "token",
                accessToken
            );

            setToken(accessToken);

            console.log("Login successful");

        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        // <div className="app">

        //     {/* Header */}
        //    <header className="app-header">

        //             <div className="app-nav">

        //                 <div className="brand">
        //                     <div className="brand-icon">
        //                         ✦
        //                     </div>

        //                     <span>
        //                         Vertex<span>Portal</span>
        //                     </span>
        //                 </div>

        //                 <nav className="nav-links">

        //                     <a href="#">
        //                         ◉ Courses
        //                     </a>

        //                     <a href="#">
        //                         &lt;/&gt; Playground
        //                     </a>

        //                 </nav>

        //                 <div className="nav-actions">

        //                     <button
        //                         type="button"
        //                         className="theme-button"
        //                         aria-label="Toggle theme"
        //                     >
        //                         ☼
        //                     </button>

        //                     {!token && (
        //                         <>
        //                             <button
        //                                 type="button"
        //                                 className="login-nav-button"
        //                             >
        //                                 Log in
        //                             </button>

        //                             <button
        //                                 type="button"
        //                                 className="signup-nav-button"
        //                             >
        //                                 Sign up
        //                             </button>
        //                         </>
        //                     )}

        //                 </div>

        //             </div>

        //         </header>


        //     {/* Login */}
        //     {!token ? (

        //         <div className="login-container">

        //             <h2>Login</h2>

        //             <input
        //                 type="email"
        //                 placeholder="Email"
        //                 value={email}
        //                 onChange={(e) =>
        //                     setEmail(e.target.value)
        //                 }
        //             />

        //             <input
        //                 type="password"
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={(e) =>
        //                     setPassword(e.target.value)
        //                 }
        //             />

        //             <button onClick={login}>
        //                 Login
        //             </button>

        //             {error && !loading && (
        //                 <div className="ai-error-section">

        //                     <div className="section-heading">

        //                         <div className="heading-icon error-icon">
        //                             !
        //                         </div>

        //                         <div>
        //                             <span>VERTEXLEARN AI</span>
        //                             <h2>Something went wrong</h2>
        //                         </div>

        //                     </div>

        //                     <div className="error-card">

        //                         <div className="error-card-icon">
        //                             !
        //                         </div>

        //                         <div className="error-card-content">

        //                             <h3>
        //                                 We couldn't generate an answer
        //                             </h3>

        //                             <p>
        //                                 {error}
        //                             </p>

        //                             <button
        //                                 type="button"
        //                                 className="retry-button"
        //                                 onClick={handleAskAI}
        //                                 disabled={!question.trim()}
        //                             >
        //                                 Try Again
        //                                 <span>↻</span>
        //                             </button>

        //                         </div>

        //                     </div>

        //                 </div>
        //             )}

        //         </div>

        //     ) : (

        //         /* AI Tutor */
        //         <AITutor
        //             courseId="6a677a2cbf246ea0b506a8bb"
        //             lectureId="6a69a72039babcbd81eccf7c"
        //         />

        //     )}

        // </div>

         <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/courses"
                element={<Courses />}
            />

            <Route
                path="/courses/:courseId"
                element={<CourseDetails />}
            />

            <Route
                path="/ai-tutor"
                element={
                    <AITutor
                        courseId="6a677a2cbf246ea0b506a8bb"
                        lectureId="6a69a72039babcbd81eccf7c"
                    />
                }
            />

            <Route
                path="/playground"
                element={<Playground />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

        </Routes>
    );
}

export default App;
