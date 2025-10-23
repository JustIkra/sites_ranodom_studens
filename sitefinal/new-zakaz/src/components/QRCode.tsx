import React from 'react';

interface QRCodeProps {
  size?: number;
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ size = 150, className = '' }) => {
  return (
    <img
      src="/images/QR.jpeg"
      width={size}
      height={size}
      className={`inline-block rounded-lg shadow border border-gray-200 ${className}`}
      alt="QR-код для пожертвований"
    />
  );
};

export default QRCode;
