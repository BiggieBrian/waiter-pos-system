import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f1f1f", // dark background
            color: "#fff", // white text
          },
          success: {
            iconTheme: {
              primary: "#f43f5e", // rose red
              secondary: "#1f1f1f",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#1f1f1f",
            },
          },
        }}
      />
    </>
  );
}

export default App;
