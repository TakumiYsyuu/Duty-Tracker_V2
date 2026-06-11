import DashBoard from "./components/DashBoard";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#0D1B2A",
            backgroundImage: `
              linear-gradient(to right, rgba(224, 225, 221, 0.1) 2px, transparent 1px),
              linear-gradient(to bottom, rgba(65, 90, 119, 0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />
          <DashBoard />
        </div>
      </div>
    </>
  );
}

export default App;
