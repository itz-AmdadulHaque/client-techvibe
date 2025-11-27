"use client";
import { Button } from "@/components/ui/button";

interface CounterProps {
  value: number; // ✨ REQUIRED: Always pass the controlled value from the parent
  min?: number;
  max?: number;
  onChange: (value: number) => void; // ✨ REQUIRED: Function to call on change
  loading?: boolean;
}

export default function ItemCounter({
  value, // Now required
  min = 1,
  max,
  onChange, // Now required
  loading = false,
}: CounterProps) {
  // We don't need local state for debouncing anymore.
  // The value prop passed from the parent is the source of truth.
  const count = value; 

  const updateCount = (newValue: number) => {
    // ⚠️ CRITICAL: Check if the parent is currently loading
    if (loading) return; 

    if (newValue < min) return;
    if (max && newValue > max) return;
    
    // Immediately call onChange. The parent will debounce the API call.
    onChange(newValue);
  };

  // Combine existing disabled conditions with the new loading state
  const isDecrementDisabled = count <= min || loading;
  const isIncrementDisabled = (max ? count >= max : false) || loading;
  const isAnyControlDisabled = loading; 

  return (
    <div 
      className={`flex items-center gap-3 border-1 border-gray-300 rounded-sm ${
        isAnyControlDisabled ? 'opacity-50 cursor-not-allowed' : '' 
      }`}
    >
      <Button
        variant="ghost"
        className='h-6 w-8 text-bold rounded-sm'
        onClick={() => updateCount(count - 1)}
        disabled={isDecrementDisabled}
      >
        -
      </Button>
      <p className="font-semibold">
        {count}
      </p>
      <Button
        variant="ghost"
        className='h-6 w-6 rounded-sm text-bold'
        onClick={() => updateCount(count + 1)}
        disabled={isIncrementDisabled}
      >
        +
      </Button>
    </div>
  );
}