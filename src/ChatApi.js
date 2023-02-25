export async function CreateConversation() {
  return await fetch(
    (await GetBasePath()) + "/ChatBot/CreateConversation?id=1",
    {
      method: "POST",
    }
  );
}

export async function GetChatResponse(conversation, prompt) {
  return await fetch((await GetBasePath()) + "/ChatBot/GetChatResponse", {
    method: "POST",
    body: JSON.stringify({
      conversation,
      prompt,
      chatBotId: 1,
    }),
    headers: { "Content-Type": "application/json" },
  });
}

const serverIp = "92.34.6.221";
let currentIp = null;

export async function GetIsServer() {
  try {
    if (!currentIp) {
      let result = await (
        await fetch("https://api.ipify.org?format=json", {
          method: "GET",
        })
      ).json();
      currentIp = result.ip;
    }

    return currentIp === serverIp;
  } catch {
    currentIp = "error";
    return false;
  }
}

export async function GetBasePath() {
  let requestPath = "https://sakurapi.se/careless-api";

  let isServer = await GetIsServer();
  if (isServer) {
    requestPath = "http://192.168.1.89/careless-api";
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //use local address if development
    //requestPath = "https://localhost:5001";
    //requestPath = "http://192.168.1.89/auto-builder";
  }

  return requestPath;
}
