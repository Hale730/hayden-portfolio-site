import { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const hexToRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

// Read a section's [data-c1/c2/c3] palette as a triple of rgb arrays.
const paletteOf = (el) => [
  hexToRgb(el.dataset.c1),
  hexToRgb(el.dataset.c2),
  hexToRgb(el.dataset.c3),
];

const tripleToColors = (t) => ({
  color1: rgbToHex(...t[0]),
  color2: rgbToHex(...t[1]),
  color3: rgbToHex(...t[2]),
});

// Stable reference so re-renders on scroll never re-create the canvas.
const CANVAS_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  pointerEvents: 'none',
  background: '#000000',
};

// Static palette used everywhere except pages that opt into section colors.
const STATIC_COLORS = { color1: '#ffffff', color2: '#ffffff', color3: '#3e6ae4' };

export default function ShaderBackground({ animateColors = false }) {
  const [colors, setColors] = useState(() => {
    if (animateColors && typeof document !== 'undefined') {
      const first = document.querySelector('[data-shader-section]');
      if (first) return tripleToColors(paletteOf(first));
    }
    return STATIC_COLORS;
  });

  useEffect(() => {
    if (!animateColors) return;

    const sections = Array.from(document.querySelectorAll('[data-shader-section]'));
    if (!sections.length) return;

    // Ease the live gradient toward whichever section owns the viewport center.
    let current = paletteOf(sections[0]);
    let target = current;
    let raf = 0;
    let running = false;

    const pickTarget = () => {
      const mid = window.innerHeight / 2;
      let best = sections[0];
      let bestDist = Infinity;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        const dist = Math.abs((r.top + r.bottom) / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      }
      target = paletteOf(best);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    const step = () => {
      let settled = true;
      current = current.map((channel, i) =>
        channel.map((v, j) => {
          const next = v + (target[i][j] - v) * 0.12;
          if (Math.abs(target[i][j] - next) > 0.5) settled = false;
          return next;
        })
      );
      setColors(tripleToColors(current));
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    pickTarget();
    window.addEventListener('scroll', pickTarget, { passive: true });
    window.addEventListener('resize', pickTarget);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', pickTarget);
      window.removeEventListener('resize', pickTarget);
    };
  }, [animateColors]);

  return (
    <ShaderGradientCanvas
      style={CANVAS_STYLE}
      pixelDensity={1.5}
      fov={45}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uTime={0}
        uSpeed={0.26}
        uStrength={1}
        uDensity={1.3}
        uFrequency={2.5}
        uAmplitude={2}
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        positionX={0.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        cAzimuthAngle={180}
        cDistance={3.6}
        cPolarAngle={90}
        cameraZoom={1}
        reflection={0.1}
        brightness={1.2}
        grain="on"
        grainBlending={100}
        lightType="3d"
        shader="defaults"
        wireframe={false}
        range="disabled"
        rangeStart={0}
        rangeEnd={40}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
