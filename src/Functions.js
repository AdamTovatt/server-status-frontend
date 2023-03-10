import React from "react";
import Cookies from "universal-cookie";

export function GetFormattedMinutesValue(value) {
  if (value == -1) return "-1";

  let hours = Math.floor(value / 60);
  let leftOverMinutes = Math.round(value - hours * 60);

  return hours + "h " + leftOverMinutes + "min";
}

export function GetTimeSinceDate(time) {
  let seconds = (Date.now() - new Date(time)) / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  if (minutes < 2) {
    return seconds.toString().split(".")[0] + " s";
  } else if (hours < 2) {
    return minutes.toString().split(".")[0] + " min";
  } else if (hours < 24) {
    return hours.toString().split(".")[0] + " h";
  } else {
    return time.toString().replace("T", " ").split(".")[0];
  }
}

export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setCookie(cookieName, cookieValue) {
  const cookies = new Cookies();
  cookies.set(cookieName, cookieValue, {
    path: "/",
    sameSite: "none",
    secure: true,
  });
}

export const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};
