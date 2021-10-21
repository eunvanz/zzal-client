import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { ExtendableHTMLProps } from "~/types";

export interface IntersectionProps extends ExtendableHTMLProps<HTMLDivElement> {
  root?: Element | Document | null | undefined;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: VoidFunction;
}

const Intersection = ({
  onIntersect,
  children,
  root = null,
  rootMargin,
  threshold,
  ...restProps
}: IntersectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(containerRef, {
    root,
    rootMargin,
    threshold,
  });

  useEffect(() => {
    intersection?.isIntersecting && onIntersect?.();
  }, [intersection?.isIntersecting, onIntersect]);

  return (
    <div ref={containerRef} {...restProps}>
      {children}
    </div>
  );
};

export default Intersection;
