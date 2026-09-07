import { Navigation, Plus, Minus, Layers, Crosshair } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
  onCompass: () => void;
  onLayers: () => void;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onCompass,
  onLayers,
}: MapControlsProps) {
  const buttonClass =
    'w-10 h-10 rounded-md bg-white border border-[#D7DADE] shadow-[0_2px_12px_rgba(41,59,70,0.06)] flex items-center justify-center hover:bg-[#FBFCFA] transition-colors text-[#293B46]';

  return (
    <div className="absolute right-4 top-1/3 flex flex-col gap-2 z-10">
      <button className={buttonClass} onClick={onCompass} aria-label="Reset bearing">
        <Navigation size={18} strokeWidth={2} />
      </button>
      <button className={buttonClass} onClick={onZoomIn} aria-label="Zoom in">
        <Plus size={18} strokeWidth={2} />
      </button>
      <button className={buttonClass} onClick={onZoomOut} aria-label="Zoom out">
        <Minus size={18} strokeWidth={2} />
      </button>
      <button className={buttonClass} onClick={onLayers} aria-label="Toggle layers">
        <Layers size={18} strokeWidth={2} />
      </button>
      <div className="mt-2">
        <button className={buttonClass} onClick={onLocate} aria-label="Locate me">
          <Crosshair size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
