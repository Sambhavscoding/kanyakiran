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
        // click on the dark backdrop (the dialog element itself) closes it
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(92vw,34rem)] max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 text-neutral-900 backdrop:bg-black/70"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="join-title" className="text-2xl font-semibold">Join the Movement</h2>
          <button type="button" onClick={close} aria-label="Close" className="text-2xl leading-none">×</button>
        </div>
        <JoinForm key={formKey} onDone={close} />
      </dialog>
    </JoinModalContext.Provider>
  );
}