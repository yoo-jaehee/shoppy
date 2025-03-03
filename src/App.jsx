import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "/src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCleint = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryCleint}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
