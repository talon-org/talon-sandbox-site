import { useEffect, useRef } from 'react';

type Frame = {
  kind: 'agent' | 'prompt' | 'ok' | 'info' | 'dim';
  text: string;
  delay: number;
};

const FRAMES: Frame[] = [
  { kind: 'agent',  text: '收到任务 · 拉起 sandbox 跑 Next.js 项目', delay: 600 },
  { kind: 'prompt', text: 'talon-sandbox create --image node:20', delay: 600 },
  { kind: 'ok',     text: '✓ sb_42a1 ready in 28ms', delay: 350 },
  { kind: 'prompt', text: 'git clone github.com/acme/dashboard .', delay: 500 },
  { kind: 'dim',    text: "Cloning into '.'... 412 objects, 12.3 MiB", delay: 600 },
  { kind: 'prompt', text: 'npm install && npm run dev', delay: 500 },
  { kind: 'info',   text: 'vite v5.4.2 ready in 412 ms', delay: 350 },
  { kind: 'info',   text: '  Local: http://localhost:5173/', delay: 350 },
  { kind: 'prompt', text: 'talon-sandbox expose sb_42a1 5173', delay: 450 },
  { kind: 'ok',     text: '✓ https://sb-42a1-5173.preview.sandbox.talon.net.cn', delay: 500 },
  { kind: 'agent',  text: '任务完成 · 等待下一条指令', delay: 2200 },
];

export default function HeroTerminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    function playFrame() {
      const body = bodyRef.current;
      if (!body) return;

      const f = FRAMES[idxRef.current % FRAMES.length];
      const line = document.createElement('div');
      line.className = `tln-line tln-${f.kind}`;

      if (f.kind === 'prompt') {
        const span = document.createElement('span');
        span.className = 'tln-prompt';
        span.textContent = '$ ';
        line.appendChild(span);
        line.appendChild(document.createTextNode(f.text));
      } else {
        line.textContent = f.text;
      }

      body.appendChild(line);
      while (body.children.length > 10) {
        body.removeChild(body.firstChild!);
      }

      idxRef.current++;

      if (idxRef.current >= FRAMES.length) {
        timerRef.current = setTimeout(() => {
          if (bodyRef.current) bodyRef.current.innerHTML = '';
          idxRef.current = 0;
          playFrame();
        }, f.delay);
      } else {
        timerRef.current = setTimeout(playFrame, f.delay);
      }
    }

    timerRef.current = setTimeout(playFrame, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="hero-term" role="presentation" aria-hidden="true">
      <div className="hero-term-head">
        <span className="tln-dot"></span>
        <span className="tln-id">sb_42a1</span>
        <span className="tln-sep">·</span>
        <span>主 shell</span>
        <span className="tln-meta">node@9d3 · /workspace · 80×24</span>
      </div>
      <div className="hero-term-body" ref={bodyRef}></div>
    </div>
  );
}
