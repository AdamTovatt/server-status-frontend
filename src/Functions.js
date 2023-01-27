import Cookies from "universal-cookie";

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
