import React from 'react';

function MessageModal({ message, onClose }) {
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={closeButtonStyle}>&times;</span>
        <p className="message">{message}</p>
        <button className="submit-button-for-Modal" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '50px',
  borderRadius: '10px',
  textAlign: 'center',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  cursor: 'pointer',
  fontSize: '24px',
  color: '#999',
};

export default MessageModal;
