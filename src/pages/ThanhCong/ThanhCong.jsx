import React, { useState, useEffect } from 'react';

const congratulationsMessage = "Cảm ơn Anh/Chị đã dành thời gian hoàn thành form.\nChúc Anh/Chị sẽ may mắn là người trúng thưởng.\nGiờ Anh/Chị có thể thoát khỏi form.";

const ThanhCong = () => {
  // Hàm tạo các phần tử confetti
  const createConfetti = () => {
    const confettiCount = 50;
    const confettiContainer = document.querySelector('.confetti-container');
    if (confettiContainer) {
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2})`;
        confettiContainer.appendChild(confetti);
      }
    }
  };

  // Chạy hoạt ảnh confetti khi component được mount
  useEffect(() => {
    createConfetti();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center text-center p-5 bg-[#f0f0f0]">
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            color: #4a4a4a;
          }
          .container {
            max-width: 700px;
            padding: 3rem;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 1.5rem;
            border: 2px solid #f1948a;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            animation: fadeIn 1.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          h1.title {
            font-size: 3.5rem;
            color: #d35400;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
            animation: popIn 1s ease-out;
          }
          @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .message {
            font-size: 1.5rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            font-weight: 400;
            white-space: pre-wrap;
          }
          .confetti-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
          }
          .confetti {
            position: absolute;
            background-color: #ff33a1; /* Màu hồng rực rỡ */
            width: 15px; /* Kích thước lớn hơn */
            height: 15px; /* Kích thước lớn hơn */
            border-radius: 50%;
            opacity: 0;
            animation: fall 3s infinite;
          }
          .confetti:nth-child(2n) { background-color: #00ff9c; } /* Xanh lục tươi */
          .confetti:nth-child(3n) { background-color: #ff9900; } /* Cam đậm */
          .confetti:nth-child(4n) { background-color: #9933ff; } /* Tím */

          @keyframes fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>

      <div className="confetti-container"></div>

      <div className="container">
        {/* Tiêu đề lớn và nổi bật */}
        <h1 className="title">GỬI THÀNH CÔNG!</h1>

        {/* Tin nhắn chúc mừng chi tiết */}
        <p className="message animate-fadeIn">
          {congratulationsMessage}
        </p>
      </div>
    </div>
  );
};

export default ThanhCong;
