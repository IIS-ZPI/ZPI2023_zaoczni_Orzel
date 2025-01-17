import { useEffect, useRef } from "react";

type useBlurType = {
  onBlur: () => void;
};

export const useBlur = ({ onBlur }: useBlurType) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!inputRef.current) return;
      if (
        e.target instanceof Node &&
        !e.composedPath().includes(inputRef.current)
      ) {
        onBlur();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return { inputRef };
};
