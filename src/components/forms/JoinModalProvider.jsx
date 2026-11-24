"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import JoinForm from "./JoinForm";

const JoinModalContext = createContext(null);

// Any button anywhere on the site can do:  const { open } = useJoinModal();  <button onClick={open}>
export function useJoinModal() {
  const ctx = useContext(JoinModalContext);
  if (!ctx) throw new Error("useJoinModal must be used inside <JoinModalProvider>");
  return ctx;
}

export function JoinModalProvider({ children }) {
  const dialogRef = useRef(null);
  // Changing this key remounts the form, which gives a fresh empty form each time
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    setFormKey((k) => k + 1);
    dialogRef.current?.showModal(); // native <dialog>: gives focus trapping and Esc to close
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <JoinModalContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="join-title"
        // a click on the blurred backdrop (the dialog element itself) closes it
        onClick={(e) => e.target === dialogRef.current && close()}
        style={{ colorScheme: "dark" }}
        className="m-auto w-[min(94vw,36rem)] overflow-hidden rounded-3xl border border-fuchsia-400/25 bg-[#140b22]/80 p-0 text-white shadow-[0_0_80px_rgba(168,85,247,0.35)] backdrop-blur-2xl backdrop:bg-[#0a0412]/60 backdrop:backdrop-blur-md"
      >
        {/* thin gradient line on top of the card */}
        <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-[#fecb34]" />
        {/* soft glow behind the content */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-600/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />

        <div className="relative max-h-[88vh] overflow-y-auto px-5 pb-7 pt-5 sm:px-9">
          <div className="mb-5 sm:mb-6 flex items-start justify-between gap-3 sm:gap-4">
            <div>
              <h2 id="join-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
                Join the <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-[#fecb34] bg-clip-text text-transparent">Movement</span>
              </h2>
              <p className="mt-1 text-sm text-fuchsia-200/70">#AbAurNahi &nbsp; #GirlsWhoInspire</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl leading-none text-white/80 transition hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            >
              ×
            </button>
          </div>

          <JoinForm key={formKey} onDone={close} />
        </div>
      </dialog>
    </JoinModalContext.Provider>
  );
}