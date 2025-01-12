import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import React from "react";
interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  className?: string;
  onClose: () => void;
}

export default function Modal({ children, open, className = "", onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={className} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}