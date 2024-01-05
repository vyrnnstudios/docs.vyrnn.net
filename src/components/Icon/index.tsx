'use client';

import {
  SVGProps,
  useEffect,
  useRef
} from 'react';

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    async function loadSVG() {
      const svg = await import(`../../assets/svgs/${name}.svg`);

      if (ref.current) {
        ref.current.innerHTML = svg.default;

        console.log(svg);
      }
    }

    loadSVG();
  }, []);

  return <svg ref={ref} {...props} />;
}
