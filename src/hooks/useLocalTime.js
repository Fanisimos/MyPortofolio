import { useEffect, useState } from "react";

const format = (timeZone) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());

/** Live HH:MM clock for a given IANA timezone. */
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
