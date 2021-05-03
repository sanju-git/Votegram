import React from "react";

function Modal({ close, show, title, children, size, style, modalHeight }) {
  let showHideClassName = show ? "modal display-block" : "modal display-none";

  var modalClass = "modal-dialog";
  if (size === "lg") {
    modalClass += " modal-lg";
  } else if (size === "sm") {
    modalClass += " modal-sm";
  } else {
    modalClass += " modal-md";
  }

  let modalBodyStyle = modalHeight
    ? modalHeight
    : {
        minHeight: "100px",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      };

  return (
    <div className={showHideClassName}>
      <div className={modalClass} role="document" style={style}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">
              {title}
            </h4>
          </div>

          <div className="modal-body" style={modalBodyStyle}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
