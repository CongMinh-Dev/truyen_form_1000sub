import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  classNameLable2 = "",
  contentLable2 = <span></span>,
  name,
  onChange,
  value,
  onBlur,
  error,
  touched,
  readOnly,
  type = "text",
  accept = '',
}) => {
  // id, label, placeholder sẽ khác nhau giữa các input

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      {/* label giả làm nút thêm tệp */}
      <label
        htmlFor={id}
        className={classNameLable2}
      >
        {contentLable2}
      </label>

      <input
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        readOnly={readOnly ? true : false}
        id={id}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className} ${error && touched ? "border-red-500" : ""
          }`}
        placeholder={placeholder}
        accept={accept}
      />

      {/* thông báo lỗi */}
      {error && touched ? (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      ) : null}


    </div>
  );
};

export default InputCustom;
