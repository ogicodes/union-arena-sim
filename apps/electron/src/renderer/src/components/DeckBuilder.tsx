import { useNavigate } from 'react-router-dom'
import NavButton from './NavButton'

const DeckBuilder = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="h-5/6 w-11/12 ">
        <div className="flex flex-col items-center justify-center bg-gray-100 h-full w-full bg-cover bg-center rounded-3xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Deck Builder</h1>
          <p className="text-lg text-gray-600 mb-8">Click below to go back to the previous page.</p>
          <NavButton text="Back" onClick={() => navigate(-1)} variant="danger" />
        </div>
      </div>
    </div>
  )
}

export default DeckBuilder
