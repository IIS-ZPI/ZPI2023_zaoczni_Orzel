import { useEffect, useRef } from "react";

type useBlurType = {
  active?: boolean;
  onBlur: () => void;
};

export const useBlur = ({ active = true, onBlur }: useBlurType) => {
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!blurRef.current) return;
      if (!active) return;
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
  }, [onBlur, active]);

  return { blurRef };
};
