import { Menu, Moon, Settings, House, Flag, X } from "lucide-react";
import { useState, useRef } from "react";
import React from "react";
import "../App.css";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef(null);

  return (
    <>
      <div className="w-full bg-[#0D1B2A] border-b border-[#1B263B] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-lg text-[#778DA9] hover:bg-[#1B263B] hover:text-[#E0E1DD] transition-colors duration-200"
          >
            <Menu size={20} />
          </button>
          <span className="font-brand font-bold text-lg text-[#E0E1DD] tracking-widest uppercase">
            Taláan
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => modalRef.current?.showModal()}
            className="p-2 rounded-lg text-[#778DA9] hover:bg-[#1B263B] hover:text-[#E0E1DD] transition-colors duration-200"
          >
            <Settings size={20} />
          </button>

          <button className="p-2 rounded-lg text-[#778DA9] hover:bg-[#1B263B] hover:text-[#E0E1DD] transition-colors duration-200">
            <Moon size={20} />
          </button>
        </div>
      </div>

      <dialog ref={modalRef} className="modal modal-middle">
        <div className="modal-box bg-[#1B263B] border border-[#415A77] rounded-xl p-0 overflow-hidden w-11/12 max-w-md">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#415A77]">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-brand text-base font-semibold text-[#E0E1DD] tracking-widest uppercase">
                Settings
              </h3>
              <p className="font-body text-xs text-[#778DA9]">
                Manage your data and preferences
              </p>
            </div>
            <form method="dialog">
              <button className="p-2 rounded-lg text-[#778DA9] hover:bg-[#415A77] hover:text-[#E0E1DD] transition-colors duration-200">
                <X size={18} />
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-2 px-6 py-5">
            <button className="font-ui w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0D1B2A] border border-[#415A77] text-[#E0E1DD] hover:bg-[#415A77] hover:border-[#778DA9] transition-colors duration-200 text-sm font-medium tracking-wide">
              <span className="text-emerald-400">↑</span>
              Import Data
            </button>

            <button className="font-ui w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0D1B2A] border border-[#415A77] text-[#E0E1DD] hover:bg-[#415A77] hover:border-[#778DA9] transition-colors duration-200 text-sm font-medium tracking-wide">
              <span className="text-[#778DA9]">↓</span>
              Export Data
            </button>

            <div className="border-t border-[#415A77] my-1" />

            <button className="font-ui w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0D1B2A] border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:border-red-500 transition-colors duration-200 text-sm font-medium tracking-wide">
              <span>✕</span>
              Erase All Data
            </button>
          </div>

          <div className="px-6 py-4 border-t border-[#415A77] flex justify-end">
            <form method="dialog">
              <button className="font-ui px-5 py-2 rounded-lg bg-[#415A77] text-[#E0E1DD] hover:bg-[#778DA9] hover:text-[#0D1B2A] transition-colors duration-200 text-sm font-medium tracking-widest uppercase">
                Close
              </button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full z-30 bg-[#1B263B] w-[40vw] min-w-55 max-w-xs flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="font-brand text-xs tracking-widest uppercase text-[#778DA9]">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg text-[#778DA9] hover:bg-[#415A77] hover:text-[#E0E1DD] transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 pt-4 px-6 pb-5 flex-wrap">
          <div className="h-16 w-16 sm:h-14 sm:w-14 rounded-full bg-[#415A77] border-2 border-[#778DA9] flex items-center justify-center shrink-0 overflow-hidden">
            <span className="font-brand text-[#E0E1DD] text-lg font-semibold">
              NU
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-ui text-[#E0E1DD] font-semibold text-base truncate">
              NameUser
            </span>
            <span className="font-body text-[#778DA9] text-sm truncate">
              @nameuser
            </span>
          </div>
        </div>

        <div className="mx-5 border-t border-[#415A77]" />

        <nav className="flex flex-col gap-2 px-4 pt-5">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#415A77] text-[#E0E1DD] hover:bg-[#778DA9] hover:text-[#0D1B2A] transition-colors duration-200 w-full text-left">
            <House size={18} className="shrink-0" />
            <span className="font-ui text-sm font-medium truncate">
              Dashboard
            </span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-transparent text-[#778DA9] hover:bg-[#415A77] hover:text-[#E0E1DD] transition-colors duration-200 w-full text-left">
            <Flag size={18} className="shrink-0" />
            <span className="font-ui text-sm font-medium truncate">Goal</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
