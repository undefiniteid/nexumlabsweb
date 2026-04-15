import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  type FC,
  type PointerEvent,
} from "react";

interface LinearLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  interactive?: boolean;
}

export const LinearLoop: FC<LinearLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + " \u00A0 ";
  }, [marqueeText]);

  const measureRef = useRef<HTMLSpanElement | null>(null);
  const tspansRef = useRef<SVGTSpanElement[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [pathLength, setPathLength] = useState(0);
  const [spacing, setSpacing] = useState(0);

  const uid = useId();
  const pathId = `linear-path-${uid.replace(/:/g, "")}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  // Measure text width using an off-screen HTML span
  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        const width = measureRef.current.getBoundingClientRect().width;
        if (width > 0) {
          setSpacing(width);
        }
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (measureRef.current) observer.observe(measureRef.current);

    const fontReady = (document as any).fonts?.ready;
    if (fontReady) fontReady.then(measure);
    
    window.addEventListener("load", measure);
    const timeoutId = setTimeout(measure, 500);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", measure);
      clearTimeout(timeoutId);
    };
  }, [text]);

  useEffect(() => {
    const measurePath = () => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };
    measurePath();
    window.addEventListener("resize", measurePath);
    return () => window.removeEventListener("resize", measurePath);
  }, []);

  useEffect(() => {
    if (!spacing) return;

    let frame: number;
    const step = () => {
      tspansRef.current.forEach((t) => {
        if (!t) return;
        let x = parseFloat(t.getAttribute("x") || "0");

        if (!dragRef.current) {
          const delta = dirRef.current === "right" ? Math.abs(speed) : -Math.abs(speed);
          x += delta;
        }

        const totalWidth = tspansRef.current.length * spacing;
        if (x < -spacing) x += totalWidth;
        if (x > totalWidth - spacing) x -= totalWidth;

        t.setAttribute("x", x.toString());
      });
      frame = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  const repeats = pathLength && spacing ? Math.ceil(pathLength / spacing) + 2 : 0;
  const ready = pathLength > 0 && spacing > 0;

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    tspansRef.current.forEach((t) => {
      if (!t) return;
      let x = parseFloat(t.getAttribute("x") || "0");
      x += dx;
      const totalWidth = tspansRef.current.length * spacing;
      if (x < -spacing) x += totalWidth;
      if (x > totalWidth - spacing) x -= totalWidth;
      t.setAttribute("x", x.toString());
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (Math.abs(velRef.current) > 1) {
      dirRef.current = velRef.current > 0 ? "right" : "left";
    }
  };

  return (
    <div
      className="w-full relative"
      style={{ visibility: ready ? "visible" : "hidden", cursor: interactive ? (dragRef.current ? "grabbing" : "grab") : "auto" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {/* Robust measurement span (off-screen) */}
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          whiteSpace: "pre",
          visibility: "hidden",
        }}
        className="text-[1.8rem] md:text-[3rem] font-bold tracking-[6px] uppercase"
      >
        {text}
      </span>

      <svg
        className="select-none w-full overflow-visible block text-[1.8rem] md:text-[3rem] font-bold tracking-[6px] uppercase leading-none"
        viewBox="0 0 1440 200"
      >
        <defs>
          <path ref={pathRef} id={pathId} d="M-10000,120 L10000,120" fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text key={spacing} xmlSpace="preserve" className={className ?? "fill-current"}>
            <textPath href={`#${pathId}`} xmlSpace="preserve">
              {Array.from({ length: repeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => { if (el) tspansRef.current[i] = el; }}
                >
                  {text}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};
