import circleLogo from '../assets/circleLogo.png'
import { useNavigate } from 'react-router-dom'
import InputField from './InputField'
import NavButton from './NavButton'
import { useState } from 'react'
import DropdownList from './DropdownList'

const SoloPlay = () => {
  const navigate = useNavigate()
  const [selectedDeck, setSelectedDeck] = useState('')

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ]

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="h-5/6 w-5/12 ">
        <div className="flex flex-col items-center justify-center bg-[#131313] h-full w-full bg-grid-pattern bg-grid-size rounded-3xl">
          <img src={circleLogo} alt="Union Arena Simulation" className="h-40 w-40" />
          <h1 className="text-4xl font-semibold text-white my-10">
            Union{' '}
            <span className="text-[#3a3939] hover:text-gray-300 transition duration-300">
              Arena
            </span>{' '}
            Simulation
          </h1>
          <div className="flex flex-col gap-10 mb-4">
            <InputField
              placeholder="Player 1 Name"
              value={undefined}
              onChange={undefined}
              variant="tertiary"
              widthSize="xl"
            />
            <DropdownList
              options={options}
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              placeholder="Choose an option"
              variant="primary"
              size="large"
              widthSize="xl"
            />
            <p className=" text-gray-400">Selected Deck: {selectedDeck}</p>
            <InputField
              placeholder="Player 2 Name"
              value={undefined}
              onChange={undefined}
              variant="tertiary"
              widthSize="xl"
            />
            <DropdownList
              options={options}
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              placeholder="Choose an option"
              variant="primary"
              size="large"
              widthSize="xl"
            />
            <p className=" text-gray-400">Selected Deck: {selectedDeck}</p>
          </div>
          <div className="flex gap-4 mb-4">
            <NavButton
              text="Back"
              onClick={() => navigate(-1)}
              variant="primary"
              size="full"
            />
            <NavButton
              text="Join Lobby"
              onClick={() => navigate(-1)}
              variant="tertiary"
              size="full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoloPlay
