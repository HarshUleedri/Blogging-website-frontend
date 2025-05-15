const Modal = ({ children, isOpen, modalRef }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div ref={modalRef}>{children}</div>
    </div>
  );
};

export default Modal;
