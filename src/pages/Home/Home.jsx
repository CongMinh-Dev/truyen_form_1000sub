import { useFormik } from 'formik';
import * as yup from 'yup'

import { useEffect, useState } from 'react';
import InputCustom from '../../components/Input/InputCustom';
import Loading from '../../components/Loading/Loading';
import ThanhCong from '../ThanhCong/ThanhCong';
import GithubVideo from '../../components/GithubVideo/GithubVideo';

const Home = () => {
    // XỬ LÝ LOADING 
    const [isLoading, setIsLoading] = useState(false)

    // XỬ LÝ HIỆN SUBMIT THÀNH CÔNG
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

    const { handleChange, handleSubmit, values, errors, handleBlur, touched, setFieldValue, resetForm } = useFormik({
        initialValues: {
            answerTime: "",
            youtubeBellImg: "",
            fbName: "",
            fbAvatar: "",
            fbBellImg: "",
            outTime: "",
        },
        onSubmit: async (values) => {
            setIsLoading(true)

            // Bước 1: Tạo đối tượng FormData rỗng và thêm dữ liệu
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }

            var keyValuePairs = [];
            for (var pair of formData.entries()) {
                keyValuePairs.push(pair[0] + "=" + pair[1]);
            }
            // vì không gửi dạng json được, chỉ gửi dạng string được thôi, nên mình gửi thành dạng: `answerTime=một&youtubeBellImg=hai&...`
            var formDataString = keyValuePairs.join("&");

            // gọi axios chỗ này
            // Send a POST request to your Google Apps Script
            fetch(
                "https://script.google.com/macros/s/AKfycbylL74wuurbQdkU-Qr3Aaezv2oS5JysrDSRzU4OVRdXLTP6kNuC4_UOSsaK8zgq438bsA/exec",
                {
                    redirect: "follow",
                    method: "POST",
                    body: formDataString,
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8",
                    },
                }
            )
                .then((res) => {
                    setIsLoading(false)
                    setIsSubmitSuccess(true)
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false)
                });



        },
        validationSchema: yup.object({
            youtubeBellImg: yup.string().required("Chưa chọn tệp ảnh bật chuông youtube")
            , fbName: yup.string().required("Chưa điền tên facebook")
            , fbAvatar: yup.string().required("Chưa chọn tệp ảnh avatar facebook")
            , fbBellImg: yup.string().required("Chưa chọn tệp ảnh bật thông báo facebook")
        })
    })

    //PHẦN NGÀY GIỜ
    const now = new Date();
    const gio = now.getHours().toString().padStart(2, '0');
    const phut = now.getMinutes().toString().padStart(2, '0');
    const giay = now.getSeconds().toString().padStart(2, '0');
    const ngay = now.getDate().toString().padStart(2, '0');
    const thang = now.getMonth().toString().padStart(2, '0');
    const nam = now.getFullYear().toString().padStart(2);
    useEffect(() => {
        setFieldValue("answerTime", `${gio}:${phut}:${giay}--${ngay}/${thang}/${nam}`)
    }, [])


    //PHẦN XỬ LÝ ẢNH
    //----hàm giảm chất lượng sau đó đổi thành base64
    const reduceImageQuality = (file, quality = 0.8) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Đặt kích thước canvas bằng kích thước của ảnh
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // Vẽ ảnh lên canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Lấy dữ liệu Base64 từ canvas, giảm chất lượng (0.0 - 1.0)
                    const base64String = canvas.toDataURL('image/jpeg', quality);
                    // Kích thước ước tính (bytes) = (độ dài chuỗi Base64 * 3 / 4)
                    // console.log(`Kích thước ảnh sau khi giảm chất lượng (${quality * 100}%):`, base64String.length * 3 / 4 / 1024, 'KB');
                    resolve(base64String);
                };
                img.onerror = (error) => reject(error);
                img.src = e.target.result;
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);

        });
    };


    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [imagePreviewUrl2, setImagePreviewUrl2] = useState('');
    const [imagePreviewUrl3, setImagePreviewUrl3] = useState('');

    //-----------thay đổi ảnh youtube
    const handleImageChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl(imageUrl);

            try {
                // Gọi hàm để giảm chất lượng ảnh và nhận chuỗi Base64
                // Chất lượng 0.5 là 50%
                const reducedBase64 = await reduceImageQuality(file);
                setFieldValue("youtubeBellImg", reducedBase64)

            } catch (error) {
                console.error("Lỗi khi xử lý ảnh:", error);
            }

        }
    };

    //----------thay đổi ảnh avatar Facebook
    const handleImageChange2 = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl2(imageUrl);

            try {
                // Gọi hàm để giảm chất lượng ảnh và nhận chuỗi Base64
                // Chất lượng 0.5 là 50%
                const reducedBase64 = await reduceImageQuality(file);
                setFieldValue("fbAvatar", reducedBase64)

            } catch (error) {
                console.error("Lỗi khi xử lý ảnh:", error);
            }

        }
    };

    //---------thay đổi ảnh bật thông báo Facebook
    const handleImageChange3 = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl3(imageUrl);

            try {
                // Gọi hàm để giảm chất lượng ảnh và nhận chuỗi Base64
                // Chất lượng 0.5 là 50%
                const reducedBase64 = await reduceImageQuality(file);
                setFieldValue("fbBellImg", reducedBase64)

            } catch (error) {
                console.error("Lỗi khi xử lý ảnh:", error);
            }

        }

    };


    // XỬ LÝ KHI KHÔNG SUBMIT MÀ LẠI OUT RA
    let [AlreadySubmited, setAlreadySubmited] = useState(false)
    let handleAlreadySubmited = (e) => {
        e.preventDefault();
        if (imagePreviewUrl3) {
            setAlreadySubmited(true)
        }
    }
    useEffect(() => {
        const handleBeforeUnload = () => {
            // Chỉ gửi dữ liệu khi thoát trang nếu form chưa được gửi thành công.
            if (AlreadySubmited == false) {
                const outTime = `${gio}:${phut}:${giay}--${ngay}/${thang}/${nam}`;
                var formDataString = `outTime=${outTime}`

                // Sử dụng navigator.sendBeacon() để gửi dữ liệu một cách đáng tin cậy khi thoát trang.
                navigator.sendBeacon("https://script.google.com/macros/s/AKfycbylL74wuurbQdkU-Qr3Aaezv2oS5JysrDSRzU4OVRdXLTP6kNuC4_UOSsaK8zgq438bsA/exec", formDataString);
            }
        };

        // Thêm trình lắng nghe sự kiện vào cửa sổ
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Hàm dọn dẹp sẽ loại bỏ trình lắng nghe sự kiện.
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [AlreadySubmited]
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-xl">
                {/* GIỚI THIỆU EVENT */}
                <h1 className='text-[25px] font-bold'>EVENT <span className='text-orange-500'>BẬT CHUÔNG KÊNH</span>, <span className='text-orange-500'>FanPage</span> CÓ CƠ HỘI NHẬN <span className='text-orange-500'>1000K</span></h1>
                <ol className="list-disc list-outside space-y-1 text-gray-700 pl-3 ml-3">
                    <li>Event sẽ kết thúc khi kênh được 1000 lượt đăng ký. Lúc này sẽ quay số trúng thưởng.
                    </li>
                    <li>Sau khi quay trúng bạn nào rồi thì em sẽ kiểm tra lại các Ảnh và Thông Tin bạn gửi đã hợp lệ chưa.</li>
                    <li>Nếu hợp lệ thì em sẽ liên hệ qua tên facebook của bạn đó  để tìm cách chuyển tiền.</li>
                </ol>
                <br />

                <form className="space-y-4 md:space-y-6 text-black" action="#" onSubmit={(e) => {
                    handleAlreadySubmited(e); handleSubmit(e);
                }

                }>
                    {/* ẢNH BẬT CHUÔNG YOUTUBE */}
                    <div >
                        <label htmlFor="youtubeBellImg" className='font-bold '>ẢNH CHỨNG TỎ ĐÃ BẬT CHUÔNG YOUTUBE</label>
                        <ol className="list-disc list-outside space-y-1 text-gray-700 pl-3 ml-3">
                            <li>
                                Mọi người tìm kiếm tên kênh là: <span className='font-bold'>m mit review</span> hoặc <span className='font-bold'>@mmitreview </span>. Rồi bấm <span className='font-bold'>đăng ký</span> và <span className='font-bold'>bật chuông</span>  nha. <span className='text-orange-500'>Phải bật chuông thì mới hợp lệ nha mọi người.</span>
                            </li>
                            <li>
                                Mọi người có thể tham khảo cách bật chuông trong video bên dưới nha:
                            </li>
                        </ol>


                        <GithubVideo githubUrl='https://github.com/CongMinh-Dev/video/blob/main/h%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20b%E1%BA%ADt%20chu%C3%B4ng%20yt.mp4' />

                        <div className='mt-3'>
                            <InputCustom
                                id="youtubeBellImg"
                                onChange={handleImageChange}
                                onBlur={handleBlur}
                                error={errors.youtubeBellImg}
                                touched={touched.youtubeBellImg}
                                name="youtubeBellImg"
                                type='file'
                                accept='image/*'
                                className='bg-blue-200 hidden'

                                classNameLable2='cursor-pointer bg-blue-600 p-2 m-2 rounded-3xl text-white hover:bg-blue-800'
                                contentLable2={<span> <i class="fas fa-upload"></i> CHỌN ẢNH</span>}
                            />
                        </div>
                        <img src={imagePreviewUrl} alt="" className='w-[200px] mt-3' />

                    </div>

                    {/* TÊN FACEBOOK */}
                    <div >
                        <label htmlFor="fbName" className='font-bold '>TÊN FACEBOOK ĐÃ THAM GIA FANPAGE</label>
                        <ol className="list-disc list-outside space-y-1 text-gray-700 pl-3 ml-3">
                            <li>
                                Tên nick có phân biệt chữ hoa thường.
                            </li>
                            <li>
                                Vì đây là cách để em liên lạc tìm cách chuyển tiền, nên mọi người nhớ điền chính xác nha.
                            </li>
                        </ol>
                        <InputCustom
                            placeholder="Vui lòng nhập tên facebook "
                            id="fbName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.fbName}
                            touched={touched.fbName}
                            name="fbName"
                            value={values.fbName}
                        />
                    </div>

                    {/* ẢNH AVATAR FACEBOOK */}
                    <div >
                        <label htmlFor="fbAvatar" className='font-bold '>ẢNH AVATAR FACEBOOK</label>
                        <ol className="list-disc list-outside space-y-1 text-gray-700 pl-3 ml-3">
                            <li>
                                Phòng một số trường hợp bị trùng tên facebook, thì cần thêm hình để dễ xác minh ạ.
                            </li>
                        </ol>
                        <InputCustom
                            id="fbAvatar"
                            onChange={handleImageChange2}
                            onBlur={handleBlur}
                            error={errors.fbAvatar}
                            touched={touched.fbAvatar}
                            name="fbAvatar"
                            type='file'
                            accept='image/*'
                            className='bg-blue-200 hidden'

                            classNameLable2='cursor-pointer bg-blue-600 p-2 m-2 rounded-3xl text-white hover:bg-blue-800'
                            contentLable2={<span> <i class="fas fa-upload"></i> CHỌN ẢNH</span>}
                        />
                        <img src={imagePreviewUrl2} alt="" className='w-[200px] mt-3' />
                    </div>

                    {/* ẢNH BẬT CHUÔNG THÔNG BÁO FACEBOOK */}
                    <div >
                        <label htmlFor="fbBellImg" className='font-bold '>ẢNH CHỨNG TỎ ĐÃ BẬT THÔNG BÁO FACEBOOK</label>
                        <ol className="list-disc list-outside space-y-1 text-gray-700 pl-3 ml-3">
                            <li>
                                Để sau này mình ra nhiều event giá trị hơn nữa mà mọi người có thể dễ nhận thông báo từ fanpage hơn. <span className='text-orange-500'>Phải bật chuông thì mới hợp lệ nha mọi người.</span>
                            </li>
                            <li>
                                Mọi người có thể tham khảo cách bật thông báo fb trong video bên dưới nha:
                            </li>
                        </ol>

                        <GithubVideo githubUrl='https://github.com/CongMinh-Dev/video/blob/main/hd%20b%E1%BA%ADt%20chu%C3%B4ng%20fb3.mp4' />


                        <div className='mt-3'>
                            <InputCustom
                                id="fbBellImg"
                                onChange={handleImageChange3}
                                onBlur={handleBlur}
                                error={errors.fbBellImg}
                                touched={touched.fbBellImg}
                                name="fbBellImg"
                                type='file'
                                accept='image/*'
                                className='bg-blue-200 hidden'

                                classNameLable2='cursor-pointer bg-blue-600 p-2 m-2 rounded-3xl text-white hover:bg-blue-800'
                                contentLable2={<span> <i class="fas fa-upload"></i> CHỌN ẢNH</span>}
                            />
                        </div>
                        <img src={imagePreviewUrl3} alt="" className='w-[200px] mt-3' />
                    </div>


                    {/* button */}
                    <div>
                        {/* thông báo lỗi */}
                        {errors.youtubeBellImg && touched.youtubeBellImg ? (
                            <p className="text-red-500 text-sm mt-1">{errors.youtubeBellImg}</p>
                        ) : null}
                        {errors.fbName && touched.fbName ? (
                            <p className="text-red-500 text-sm mt-1">{errors.fbName}</p>
                        ) : null}
                        {errors.fbAvatar && touched.fbAvatar ? (
                            <p className="text-red-500 text-sm mt-1">{errors.fbAvatar}</p>
                        ) : null}
                        {errors.fbBellImg && touched.fbBellImg ? (
                            <p className="text-red-500 text-sm mt-1">{errors.fbBellImg}</p>
                        ) : null}
                        <button type="submit" className="w-full text-white bg-blue-600  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">GỬI THÔNG TIN</button>
                    </div>


                </form>



            </div>
            {isLoading ? <Loading /> : null}
            {isSubmitSuccess ? <ThanhCong /> : null}
        </div>

    );

}

export default Home;