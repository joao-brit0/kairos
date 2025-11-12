import { useEffect, useState } from "react";

export default function DateTimeComponent() {
  const [dateTime, setDateTime] = useState({ time: "", date: "" });

  function getFormattedDateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);

    return {
      time: `${hours}:${minutes}`,
      date: `${day}/${month}/${year}`,
    };
  }

  useEffect(() => {
    
    setDateTime(getFormattedDateTime());

    
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex flex-col items-center">
        <p>{dateTime.time}</p>
        <p>{dateTime.date}</p>
    </div>
  );
}
