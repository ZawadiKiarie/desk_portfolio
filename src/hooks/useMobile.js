import { useEffect, useState } from "react";

const REFERENCE_WIDTH = 2888;
const MOBILE_THRESHOLD = 1024;
const LAPTOP_THRESHOLD = 1725;
const DESKTOP_THRESHOLD = 2888;

export const useMobile = () => {
  const [scaleFactor, setScaleFactor] = useState(
    window.innerWidth / REFERENCE_WIDTH
  );

  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(window.innerWidth / REFERENCE_WIDTH);
      if (window.innerWidth <= MOBILE_THRESHOLD) {
        setDevice("mobile");
      } else if (window.innerWidth <= LAPTOP_THRESHOLD) {
        setDevice("laptop");
      } else {
        setDevice("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    scaleFactor,
    device,
  };
};
