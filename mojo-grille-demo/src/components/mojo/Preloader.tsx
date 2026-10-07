import { useEffect } from "react";

export interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return null;
}

export default Preloader;
