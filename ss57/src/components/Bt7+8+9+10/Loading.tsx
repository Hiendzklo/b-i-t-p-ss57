import React from 'react';
import './Loading.css'; // Đảm bảo bạn tạo file Loading.css để định kiểu cho component này

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
