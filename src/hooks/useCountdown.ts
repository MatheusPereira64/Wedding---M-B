import { useEffect, useState } from "react";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  arrived: boolean;
};

function diff(target: Date, now: Date): Remaining {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  }

  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    arrived: false,
  };
}

export function useCountdown(isoDate: string) {
  const [value, setValue] = useState<Remaining>(() =>
    diff(new Date(isoDate), new Date()),
  );

  useEffect(() => {
    const target = new Date(isoDate);
    const tick = () => setValue(diff(target, new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [isoDate]);

  return value;
}
