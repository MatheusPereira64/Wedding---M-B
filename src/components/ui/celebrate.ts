/**
 * Chuva curta de pétalas nas cores do convite, disparada a partir de um elemento
 * (o cartão de sucesso do RSVP). Desenha num <canvas> temporário que se remove
 * sozinho; não roda com movimento reduzido.
 */
const COLORS = ["#c4a574", "#85653a", "#7a1f32", "#5c1520", "#d4c4b0"];
const DURATION = 2400;
const FADE = 500;

type Petal = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  w: number;
  h: number;
  sway: number;
  phase: number;
  color: string;
};

export function celebrate(origin: HTMLElement | null) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "90",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const rect = origin?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : width / 2;
  const cy = rect ? rect.top + Math.min(rect.height / 2, 120) : height / 3;
  const count = width < 600 ? 70 : 110;

  const petals: Petal[] = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = 5 + Math.random() * 7;
    return {
      x: cx + (Math.random() - 0.5) * 40,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.2,
      w: 4 + Math.random() * 4,
      h: 8 + Math.random() * 7,
      sway: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#c4a574",
    };
  });

  const start = performance.now();
  let last = start;

  const frame = (now: number) => {
    const elapsed = now - start;
    // Normaliza para 60fps para a física não depender da taxa de quadros.
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;

    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = elapsed > DURATION - FADE ? Math.max((DURATION - elapsed) / FADE, 0) : 1;

    for (const p of petals) {
      p.vx *= 0.985 ** dt;
      p.vy = p.vy * 0.985 ** dt + 0.16 * dt;
      p.x += (p.vx + Math.sin(p.phase + elapsed / 260) * p.sway) * dt;
      p.y += p.vy * dt;
      p.rotation += p.spin * dt;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // A largura oscila para dar a impressão de a pétala virar no ar.
      ctx.scale(Math.cos(p.phase + elapsed / 180), 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (elapsed < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  };

  requestAnimationFrame(frame);
}
