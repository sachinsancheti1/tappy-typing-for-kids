export function Keyboard() {
  return (
    <div className="font-mono text-sm md:text-base">
      <div className="keyboard-container w-full max-w-3xl mx-auto">
        {/* Row 1 */}
        <div className="flex justify-center mb-2">
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            TAB
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            1
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            2
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            3
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            4
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            5
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            6
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            7
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            8
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            9
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            0
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center">
            -
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center mb-2">
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            Q
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            W
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            E
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            R
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            T
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            Y
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            U
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            I
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            O
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            P
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center">
            [
          </div>
        </div>

        {/* Row 3 - Home Row */}
        <div className="flex justify-center mb-2">
          <div className="key w-14 h-10 md:w-16 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            CAPS
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-orange-300 rounded flex items-center justify-center mr-1 font-bold">
            A
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-orange-300 rounded flex items-center justify-center mr-1 font-bold">
            S
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-orange-300 rounded flex items-center justify-center mr-1 font-bold">
            D
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-orange-300 rounded flex items-center justify-center mr-1 font-bold">
            F
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            G
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            H
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-purple-300 rounded flex items-center justify-center mr-1 font-bold">
            J
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-purple-300 rounded flex items-center justify-center mr-1 font-bold">
            K
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-purple-300 rounded flex items-center justify-center mr-1 font-bold">
            L
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-purple-300 rounded flex items-center justify-center font-bold">
            ;
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex justify-center mb-2">
          <div className="key w-16 h-10 md:w-20 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            SHIFT
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            Z
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            X
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            C
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            V
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            B
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            N
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            M
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            ,
          </div>
          <div className="key w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded flex items-center justify-center mr-1">
            .
          </div>
          <div className="key w-16 h-10 md:w-20 md:h-12 bg-gray-200 rounded flex items-center justify-center">
            SHIFT
          </div>
        </div>

        {/* Row 5 - Space Bar */}
        <div className="flex justify-center">
          <div className="key w-64 h-10 md:w-80 md:h-12 bg-gray-200 rounded flex items-center justify-center">
            SPACE BAR
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Home row keys are highlighted. Always return your fingers to these
            keys.
          </p>
        </div>
      </div>
    </div>
  )
}
