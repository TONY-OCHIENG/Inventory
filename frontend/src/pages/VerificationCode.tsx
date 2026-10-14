
import { useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

interface VerifyResponse {
  success: boolean;
  message: string;
}



const CODE_LENGTH = 6;

function VerificationCode() {
  const [verificationCode, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string): void => {
    const newCode = [...verificationCode];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, CODE_LENGTH).split("");
      for (let i = 0; i < CODE_LENGTH; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus the last filled input, or the next empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < CODE_LENGTH - 1 ? lastFilledIndex + 1 : CODE_LENGTH - 1;
      inputRef.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input when a digit is entered
      if (value && index < CODE_LENGTH - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const code = verificationCode.join("");
    setLoading(true);
    console.log(code)
    
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-md bg-white-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div
        className="bg-white/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit verification code sent to your email address.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={CODE_LENGTH}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-green-700 text-white border-2 border-gray-600 rounded-lg focus:border-white focus:outline-none"
              />
            ))}
          </div>

          <button            
            type="submit"
            disabled={isLoading || verificationCode.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default VerificationCode;
