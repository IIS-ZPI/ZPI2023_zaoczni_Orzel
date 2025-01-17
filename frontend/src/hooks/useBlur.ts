import { useEffect, useRef } from "react";

type useBlurType = {
  onBlur: () => void;
};

export const useBlur = ({ onBlur }: useBlurType) => {
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!blurRef.current) return;
      if (
        e.target instanceof Node &&
        !e.composedPath().includes(blurRef.current)
      ) {
        onBlur();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onBlur]);

  return { blurRef };
};
