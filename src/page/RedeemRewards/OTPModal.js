import React, { useState } from 'react';

function OTPModal({ onClose, onSubmit }) {
  const [otp, setOTP] = useState('');

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(otp);
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={closeButtonStyle}>&times;</span>
        <h2 className="modal-title">OTP Verification</h2>
        <input type="text" value={otp} onChange={handleOTPChange} placeholder="" style={inputStyle} />
        <button className="submit-button-for-Modal" onClick={handleSubmit}>ยืนยัน OTP</button>
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

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '20px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default OTPModal;
