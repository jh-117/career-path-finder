import { useEffect, useRef } from 'react';

const skills = [
  { name: 'React', x: 200, y: 150, size: 40, color: '#8b5cf6' },
  { name: 'TypeScript', x: 120, y: 80, size: 32, color: '#3b82f6' },
  { name: 'Leadership', x: 280, y: 80, size: 32, color: '#ec4899' },
  { name: 'Communication', x: 100, y: 180, size: 28, color: '#06b6d4' },
  { name: 'Problem Solving', x: 300, y: 180, size: 28, color: '#10b981' },
  { name: 'UI/UX', x: 200, y: 50, size: 24, color: '#f59e0b' },
  { name: 'Analytics', x: 200, y: 230, size: 24, color: '#6366f1' },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]
];

export default function SkillMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = '#e0e7ff';
    ctx.lineWidth = 2;
    connections.forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(skills[from].x, skills[from].y);
      ctx.lineTo(skills[to].x, skills[to].y);
      ctx.stroke();
    });

    // Draw nodes
    skills.forEach((skill) => {
      // Outer circle (glow)
      ctx.fillStyle = skill.color + '20';
      ctx.beginPath();
      ctx.arc(skill.x, skill.y, skill.size / 2 + 4, 0, Math.PI * 2);
      ctx.fill();

      // Main circle
      const gradient = ctx.createRadialGradient(
        skill.x, skill.y, 0,
        skill.x, skill.y, skill.size / 2
      );
      gradient.addColorStop(0, skill.color);
      gradient.addColorStop(1, skill.color + 'cc');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(skill.x, skill.y, skill.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.fillStyle = '#1e293b';
      ctx.font = '11px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (skill === skills[0]) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 12px -apple-system, system-ui, sans-serif';
      }
      
      ctx.fillText(skill.name, skill.x, skill.y);
    });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={280}
        className="max-w-full"
      />
    </div>
  );
}
