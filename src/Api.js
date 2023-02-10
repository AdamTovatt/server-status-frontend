export async function GetStatus(apiKey) {
  return await fetch((await GetBasePath()) + "/status?apiKey=" + apiKey, {
    method: "GET",
  });
}

export async function GetLog(apiKey, applicationName) {
  return await fetch(
    (await GetBasePath()) +
      "/log?applicationName=" +
      applicationName +
      "&apiKey=" +
      apiKey,
    {
      method: "GET",
    }
  );
}

export async function StartBuild(apiKey, applicationName) {
  return await fetch(
    (await GetBasePath()) +
      "/start?apiKey=" +
      apiKey +
      "&applicationName=" +
      applicationName,
    {
      method: "POST",
    }
  );
}

const serverIp = "92.34.13.93";
let currentIp = null;

export async function GetIsServer() {
  if (!currentIp) {
    let result = await (
      await fetch("https://api.ipify.org?format=json", {
        method: "GET",
      })
    ).json();
    currentIp = result.ip;
  }

  return currentIp === serverIp;
}

export async function GetBasePath() {
  let requestPath = "https://sakurapi.se/auto-builder";
  let isServer = await GetIsServer();
  if (isServer) requestPath = "http://192.168.1.89/auto-builder";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    //requestPath = "https://localhost:5001";
    //requestPath = "http://192.168.1.89/auto-builder";
  }

  return requestPath;
}
