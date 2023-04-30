import { useEffect, useRef } from "react";

export default function useHorizontalScroll() {
  const elRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = elRef.current;

    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (e.deltaY === 0 || target.getElementsByTagName("li").length === 0)
        return;
      e.preventDefault();

      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
      });
    };

    el.addEventListener("wheel", handleWheel);

    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return elRef;
}
