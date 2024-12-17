import { useNavigate } from 'react-router-dom'
import NavButton from './NavButton'
import LandingPageBG from '../assets/LandingPageBG.png'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="h-5/6 w-11/12 ">
        <div
          className="flex flex-col items-center justify-center h-full w-full bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url(${LandingPageBG})` }}
        >
          <h1 className="text-8xl font-bold text-white mb-20">
            Union{' '}
            <span className="text-[#3a3939] hover:text-gray-300 transition duration-300">
              Arena
            </span>{' '}
            Simulation
          </h1>
          <div className=" flex gap-20">
            <NavButton
              text="Deck Builder"
              onClick={() => navigate('/decks')}
              variant="tertiary"
              size="full"
            />
            <NavButton
              text="Solo vs. Self"
              onClick={() => navigate('/solo')}
              variant="secondary"
              size="full"
            />
            <NavButton
              text="Multiplayer"
              onClick={() => navigate('/multiplayer')}
              variant="primary"
              size="full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
