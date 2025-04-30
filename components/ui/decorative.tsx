interface DecorativeProps {
  position: "top" | "bottom"
}

export function Decorative({ position }: DecorativeProps) {
  return (
    <div
      className={`w-full flex justify-center ${position === "top" ? "mb-6" : "mt-6"}`}
    >
      <div className="w-full max-w-2xl flex justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-orange-200"></div>
          <div className="px-4 flex space-x-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-orange-200"
                ></div>
              ))}
          </div>
          <div className="flex-1 h-px bg-orange-200"></div>
        </div>
      </div>
    </div>
  )
}
