import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (index: number) => void;
};

export default function CourseOption({ active }: Props) {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      {options.map((option, index) => (
        <div
          key={index}
          className="w-full flex flex-col md:flex-row items-center md:items-start py-4"
        >
          {/* Step Circle */}
          <div
            className={`flex items-center justify-center relative shadow-md
              ${
                active >= index
                  ? "bg-blue-600 border-2 border-blue-600 text-white"
                  : "bg-gray-300 border-2 border-gray-300 text-gray-100"
              }
              w-8 h-8 md:w-12 md:h-12 rounded-full
            `}
          >
            <IoMdCheckmark className="text-sm md:text-xl" />

            {/* Connector Line */}
            {index !== options.length - 1 && (
              <div
                className={`absolute w-0.5 left-1/2 transform -translate-x-1/2
                  ${active > index ? "bg-blue-600" : "bg-gray-300"}
                `}
                style={{
                  bottom : "-28px",
                  height : "28px",
                }}
              />
            )}
          </div>

          {/* Step Label */}
          <span
            className={`mt-2 md:mt-0 md:pl-4 text-sm md:text-base tracking-wide text-center md:text-left
              ${
                active === index
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 font-medium"
              }`}
          >
            {option}
          </span>
        </div>
      ))}
    </div>
  );
}
