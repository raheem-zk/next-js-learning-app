import { HiStar } from "react-icons/hi";

const RatingStars = ({ rating, size = 16 }) => {
  const maxRating = 5;
  const filledStars = !rating ?  1 : rating == 0 ? 1 : Math.floor(rating);

  const emptyStars = maxRating - filledStars;

  return (
    <div className="flex space-x-1">
      {[...Array(filledStars)].map((_, index) => (
        <HiStar key={index} className="text-yellow-500 " size={size} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          height={`${size}px`}
          viewBox="0 -960 960 960"
          width={`${size}px`}
          fill="#5f6368"
        >
          <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
        </svg>
      ))}
    </div>
  );
};

export default RatingStars;
// Usage
