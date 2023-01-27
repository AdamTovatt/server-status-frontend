export async function GetStatus(apiKey) {
  return await fetch(GetBasePath() + "/status?apiKey=" + apiKey, {
    method: "GET",
  });
}

export async function StartBuild(apiKey, applicationName) {
  return await fetch(
    GetBasePath() +
      "/start?apiKey=" +
      apiKey +
      "&applicationName=" +
      applicationName,
    {
      method: "POST",
    }
  );
}

export function GetBasePath() {
  let requestPath = "https://ledigasalar.online/auto-builder";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    //requestPath = "https://localhost:5001";
    //requestPath = "http://192.168.1.89/auto-builder";
  }
  return requestPath;
}
