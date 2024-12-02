const InputField = ({
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'large',
  widthSize = 'medium',
  disabled = false
}) => {
  const variantStyles = {
    primary: 'bg-[#fafafa] border border-gray-300 text-center text-[#212121] focus:ring focus:ring-gray-300', 
    secondary: 'bg-[#585858] border border-gray-600 text-center text-white focus:ring focus:ring-green-300', 
    tertiary: 'bg-[#000] border border-[#3d3d3d] text-center text-white focus:ring focus:ring-gray-300', 
    danger: 'bg-red-50 border border-red-500 text-red-700 focus:ring focus:ring-red-300', 
    warning:
      'bg-yellow-50 border border-yellow-500 text-yellow-700 focus:ring focus:ring-yellow-300', 
    default: 'bg-gray-100 border border-gray-500 text-black focus:ring focus:ring-gray-300' 
  }

  const sizeStyles = {
    small: 'px-2 py-1 text-sm', 
    medium: 'px-3 py-2 text-base', 
    large: 'px-4 py-3 text-lg', 
    full: 'px-4 py-3 text-lg' 
  }



  const widthSizeStyles = {
    small: 'w-24', 
    medium: 'w-48', 
    large: 'w-72', 
    xl: 'w-96', 
    full: 'w-full' 
  }

  const appliedStyle = variantStyles[variant] || variantStyles.default 
  const appliedSize = sizeStyles[size] || sizeStyles.large 
  const appliedWidthSize = widthSizeStyles[widthSize] || widthSizeStyles.medium 

  return (
    <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={` ${appliedWidthSize} ${appliedSize} ${appliedStyle} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    style={{
      clipPath: 'polygon(1% 0%, 99% 0%, 100% 100%, 0% 100%)', 
    }}
    />
  )
}

export default InputField
