import React from 'react';

// Thành phần chính của ứng dụng
const GithubVideo = ({ githubUrl }) => {
    // Gắn cứng URL video từ Google Drive

    // Hàm chuyển đổi URL Google Drive sang URL nhúng
    const chuyenUrl = (url) => {
        // Thay thế 'github.com' bằng 'raw.githubusercontent.com'
        let rawUrl = url.replace("https://github.com/", "https://raw.githubusercontent.com/");
        // Loại bỏ '/blob/' khỏi URL
        rawUrl = rawUrl.replace("/blob/", "/");
        return rawUrl;
    }


    const finalUrl = chuyenUrl(githubUrl);

    return (
        <div className="rounded-lg overflow-hidden w-full h-[500px] bg-gray-200 flex items-center justify-center">
            {finalUrl ? (
                // <iframe
                //     src={finalUrl}
                //     className="w-full h-[500px]"
                //     // allow="autoplay"
                //     allowFullScreen
                //     title="Google Drive Video"
                // ></iframe>
                <video
                    controls
                    className="w-full h-[500px]"
                >
                    <source
                        src={finalUrl}
                        type="video/mp4"
                    />
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
            ) : (
                <p className="text-gray-500">
                    Không thể phát video từ Google Drive. Vui lòng kiểm tra lại URL chia sẻ.
                </p>
            )}
        </div>
    );
};

export default GithubVideo;
