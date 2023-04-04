import { useEffect, useState } from "react";

export function useInputDelay(delayTime: number) {
  const [inputValue, setInputValue] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<any>(null);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        console.log(inputValue);
      }, delayTime)
    );
    return () => clearTimeout(typingTimeout);
  }, [inputValue]);

  function handleInputChange(value: string) {
    setInputValue(value);
  }

  return { inputValue, handleInputChange };
}
