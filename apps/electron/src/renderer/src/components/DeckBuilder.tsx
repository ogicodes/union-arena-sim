import { useNavigate } from 'react-router-dom';
import NavButton from "./NavButton";

const DeckBuilder = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Deck Builder</h1>
        <p className="text-lg text-gray-600 mb-8">Click below to go back to the previous page.</p>
        <NavButton
          text="Back"
          onClick={() => navigate(-1)}
          variant='danger'
        />
      </div>
    );
  };
  
  export default DeckBuilder;