import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
);
