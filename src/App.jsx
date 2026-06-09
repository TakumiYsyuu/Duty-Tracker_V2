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

          <div className="p-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[auto_1fr_1fr_auto] gap-3">
              <div className="md:col-span-5 md:col-start-1 md:row-start-1 bg-[#1b263b] rounded-xl p-5 flex items-center justify-between border border-[#415a77]">
                <div className="flex flex-col gap-1">
                  <span className="font-brand text-2xl font-semibold text-[#e0e1dd] tracking-widest uppercase">
                    Kinsena Tracker
                  </span>
                  <span className="font-body text-xs tracking-widest text-[#778da9] uppercase">
                    Financial Tracker · by Victor
                  </span>
                  <span className="font-ui text-xs text-[#778da9] font-light tracking-wide">
                    Duty Tracker
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 md:col-start-1 md:row-start-2 md:row-span-2 bg-[#1b263b] rounded-xl p-5 border border-[#415a77]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                    <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                      Duty Log
                    </p>
                    <p className="font-brand text-xl font-semibold text-[#e0e1dd]">
                      1
                    </p>
                  </div>

                  <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                    <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                      Total Hours
                    </p>
                    <p className="font-brand text-xl font-semibold text-[#e0e1dd]">
                      0.00 hrs
                    </p>
                  </div>

                  <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                    <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                      OT Pay
                    </p>
                    <p className="font-brand text-xl font-semibold text-emerald-400">
                      ₱1,200
                    </p>
                  </div>

                  <div className="bg-[#0d1b2a] rounded-lg p-3 border border-[#415a77]">
                    <p className="font-ui text-xs uppercase tracking-widest text-[#778da9] mb-2">
                      Total Pay
                    </p>
                    <p className="font-brand text-xl font-semibold text-emerald-400">
                      ₱11,200
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 md:col-start-1 md:row-start-4 bg-[#415a77] hover:bg-[#4e6d8c] rounded-xl border border-[#415a77] flex items-center justify-center cursor-pointer transition-colors duration-200">
                <button className="font-ui w-full h-full py-5 text-[#e0e1dd] font-medium text-sm tracking-widest uppercase flex items-center justify-center gap-2">
                  + Log New Duty
                </button>
              </div>

              <div className="md:col-span-3 md:col-start-3 md:row-start-2 md:row-span-3 bg-[#1b263b] rounded-xl p-5 border border-[#415a77] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-brand text-sm font-semibold text-[#e0e1dd] tracking-widest uppercase">
                    Duty Log
                  </span>
                  <span className="font-ui text-xs bg-[#415a77] text-[#e0e1dd] px-3 py-1 rounded-full tracking-wide">
                    1 entry
                  </span>
                </div>

                <div className="bg-[#0d1b2a] rounded-xl border border-[#415a77] p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                      <span className="font-ui text-xs font-medium text-[#778da9] uppercase tracking-widest">
                        Daily · #2
                      </span>
                    </div>
                    <span className="font-brand text-sm font-semibold text-emerald-400">
                      ₱120
                    </span>
                  </div>

                  <p className="font-body text-xs text-[#778da9]">
                    Tue, Jun 9, 2026
                  </p>

                  <p className="font-body text-sm font-semibold text-[#e0e1dd]">
                    06:54 PM → 06:54 PM
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      24 hrs
                    </span>
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      24 reg
                    </span>
                    <span className="font-ui text-xs bg-[#1b263b] border border-[#415a77] text-[#778da9] px-2.5 py-1 rounded-full">
                      0 OT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
