import { useUpdateEffect } from "ahooks";
import { useState } from "react";

export function useInputDelay(delayTime: number, callback: any) {
  const [inputValue, setInputValue] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<any>(null);

  useUpdateEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        callback();
      }, delayTime)
    );
    return () => clearTimeout(typingTimeout);
  }, [inputValue]);

  function handleInputChange(value: string) {
    setInputValue(value);
  }

  return { inputValue, handleInputChange };
}
