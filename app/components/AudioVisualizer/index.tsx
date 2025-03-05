import React, { useRef, useEffect } from "react";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

export function AudioVisualizer({ audioRef, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ** Fix: Scale Canvas for High-DPI Displays **
    const dpr = window.devicePixelRatio || 1;
    const width = 400;
    const height = 80; // Slightly increased for better wave visuals

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // ** Web Audio API Setup **
    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128; // Adjust for better resolution
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const renderWave = () => {
      if (!isPlaying || !dataArrayRef.current) return;
      analyser.getByteFrequencyData(dataArrayRef.current);

      ctx.clearRect(0, 0, width, height);

      const bufferLength = analyser.frequencyBinCount;
      const barWidth = width / bufferLength;

      // ** Create the wave effect using Math.sin() **
      for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArrayRef.current[i] / 255;
        const barHeight = amplitude * height * 0.8; // Scale down for smooth wave

        const x = i * barWidth;
        const yOffset = Math.sin(i * 0.1) * height * 0.2; // Sin wave effect

        // ** Gradient for the smooth look **
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#4F46E5");
        gradient.addColorStop(1, "#818CF8");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          x,
          (height - barHeight) / 2 + yOffset,
          barWidth - 1,
          barHeight
        );
      }

      animationFrameRef.current = requestAnimationFrame(renderWave);
    };

    if (isPlaying) {
      audioContextRef.current.resume().then(() => {
        renderWave();
      });
    } else {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-1/3 h-[100px] bg-gray-100 rounded-md"
    />
  );
}
