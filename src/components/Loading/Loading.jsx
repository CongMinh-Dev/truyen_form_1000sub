import React, { useEffect } from 'react';

const Loading = () => {
  // Sử dụng useEffect để thêm các quy tắc CSS vào tài liệu khi component được gắn kết (mount)
  useEffect(() => {
    const styleSheet = document.createElement("style");

    // Định nghĩa các quy tắc CSS cho hiệu ứng xoay
    styleSheet.innerText = `
      @keyframes dot-bounce {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .dot:nth-child(1) {
        animation: dot-bounce 1.4s infinite ease-in-out both;
      }
      .dot:nth-child(2) {
        animation: dot-bounce 1.4s infinite ease-in-out both;
        animation-delay: -0.32s;
      }
      .dot:nth-child(3) {
        animation: dot-bounce 1.4s infinite ease-in-out both;
        animation-delay: -0.16s;
      }
    `;

    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-[100vh] w-[100vw] font-sans fixed top-0 left-0">
      <div className="flex items-center space-x-2 px-2 py-6 rounded-xl bg-white shadow-lg">
        {/* Biểu tượng loading: ba dấu chấm nhảy */}
        <div className="flex space-x-1 items-center">
          <span className="dot w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="dot w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="dot w-3 h-3 bg-blue-500 rounded-full"></span>
        </div>

        <span className="text-xl font-medium text-gray-700">Đang gửi...</span>
      </div>
    </div>
  );
};

export default Loading;
