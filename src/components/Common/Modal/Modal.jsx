import React, { useEffect, useRef } from "react";

const Modal = ({ children, isOpen, modalRef }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div ref={modalRef}>{children}</div>
    </div>
  );
};

export default Modal;
