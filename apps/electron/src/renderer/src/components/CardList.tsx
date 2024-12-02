import cardOne from '../assets/cards/UE03ST_JJK-1-036.png'
import cardTwo from '../assets/cards/UE03ST_JJK-1-037.png'
import cardThree from '../assets/cards/UE03ST_JJK-1-044.png'
import cardFour from '../assets/cards/UE03ST_JJK-1-045.png'
import cardFive from '../assets/cards/UE03ST_JJK-1-056.png'
import cardSix from '../assets/cards/UE03ST_JJK-1-058.png'
import cardSeven from '../assets/cards/UE03ST_JJK-1-062.png'
import cardEight from '../assets/cards/UE03ST_JJK-1-063.png'
import cardNine from '../assets/cards/UE03ST_JJK-1-067.png'
import cardTen from '../assets/cards/UE03ST_JJK-1-101.png'
import cardEleven from '../assets/cards/UE03ST_JJK-1-102.png'
import cardTwelve from '../assets/cards/UE03ST_JJK-1-103.png'
import cardThirteen from '../assets/cards/UE03ST_JJK-1-104.png'
import cardFourteen from '../assets/cards/UE03ST_JJK-1-105.png'
import cardFifteen from '../assets/cards/UE03ST_JJK-1-106.png'
import cardSixteen from '../assets/cards/UE03ST_JJK-1-107.png'
import cardSeventeen from '../assets/cards/UE03ST_JJK-1-108.png'
import cardEighteen from '../assets/cards/UE03ST_JJK-1-109.png'

interface CardListProps {
  onImageClick: (image: string) => void
  onImageDoubleClick: (image: string) => void
}

const CardList: React.FC<CardListProps> = ({ onImageClick, onImageDoubleClick }) => {
  const images: string[] = [
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardEight,
    cardNine,
    cardTen,
    cardEleven,
    cardTwelve,
    cardThirteen,
    cardFourteen,
    cardFifteen,
    cardSixteen,
    cardSeventeen,
    cardEighteen,
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardEight,
    cardNine,
    cardTen,
    cardEleven,
    cardTwelve,
    cardThirteen,
    cardFourteen,
    cardFifteen,
    cardSixteen,
    cardSeventeen,
    cardEighteen,
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardEight,
    cardNine,
    cardTen,
    cardEleven,
    cardTwelve,
    cardThirteen,
    cardFourteen,
    cardFifteen,
    cardSixteen,
    cardSeventeen,
    cardEighteen,
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardEight,
    cardNine,
    cardTen,
    cardEleven,
    cardTwelve,
    cardThirteen,
    cardFourteen,
    cardFifteen,
    cardSixteen,
    cardSeventeen,
    cardEighteen,
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardEight,
    cardNine,
    cardTen,
    cardEleven,
    cardTwelve,
    cardThirteen,
    cardFourteen,
    cardFifteen,
    cardSixteen,
    cardSeventeen,
    cardEighteen
  ]

  return (
    <div
      className="h-full w-full overflow-y-scroll p-4 rounded-3xl flex flex-wrap gap-4"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="rounded-md h-36 cursor-pointer"
          onClick={() => onImageClick(image)}
          onDoubleClick={() => onImageDoubleClick(image)}
          draggable="true" 
          onDragStart={(e) => e.dataTransfer.setData('text/plain', image)} 
        />
      ))}
    </div>
  )
}

export default CardList
