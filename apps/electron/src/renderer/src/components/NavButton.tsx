
const NavButton = ({ text, onClick, variant = 'default', disabled = false }) => {
    const variantStyles = {
        primary: 'bg-[#fafafa] hover:bg-[#B5B5B5] text-[#212121] focus:ring focus:ring-gray-300',
        secondary: 'bg-[#585858] hover:bg-gray-600 text-[white] focus:ring focus:ring-green-300',
        tertiary: 'bg-[#212121] hover:bg-[#3d3d3d] text-white focus:ring focus:ring-gray-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring focus:ring-red-300',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring focus:ring-yellow-300',
        default: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring focus:ring-gray-300',
      };

      const appliedStyle = variantStyles[variant] || variantStyles.default;

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-2 rounded-lg shadow-md transition ${appliedStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {text}
      </button>
    );
  };

export default NavButton;