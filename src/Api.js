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

export async function GetRating() {
  return await fetch((await GetBasePath(true)) + "/bot/rating", {
    method: "GET",
  });
}

export async function GetBetapetStatus() {
  return await fetch((await GetBasePath(true)) + "/bot/status", {
    method: "GET",
  });
}

export async function GetMatches() {
  return await fetch((await GetBasePath(true)) + "/bot/gameSummaries", {
    method: "GET",
  });
}

export async function GetChatResponse(message) {
  return await fetch(
    (await GetBasePath(true)) + "/bot/getChatResponse?message=" + message,
    {
      method: "GET",
    }
  );
}

/*
const serverIp = "92.34.6.221";
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
*/

export async function GetBasePath(betapet) {
  let requestPath = betapet
    ? "https://sakurapi.se/betapet-bot-api"
    : "https://sakurapi.se/auto-builder";

  /*
  let isServer = await GetIsServer();
  if (isServer) {
    requestPath = betapet
      ? "http://192.168.1.89/betapet-bot-api"
      : "http://192.168.1.89/auto-builder";
  }*/

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    //requestPath = "https://localhost:5001";
    //requestPath = "http://192.168.1.89/auto-builder";
  }

  return requestPath;
}
