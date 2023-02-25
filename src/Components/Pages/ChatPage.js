import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CreateConversation, GetChatResponse } from "../../ChatApi";
import { Color } from "../Constants";
import Header from "../Header";
import TextField from "../Input/TextField";
import VerticalSpacing from "../VerticalSpacing";

const ChatPage = ({}) => {
  const [conversation, setConversation] = useState(null);
  const [textResponse, setTextResponse] = useState(
    'You are asleep, write "wake up" to wake up'
  );
  const [asleep, setAsleep] = useState(true);

  useEffect(
    () => {
      async function CreateConversationWithApi() {
        let response = await CreateConversation();
        if (response.status === 201) {
          let parsedJson = await response.json();
          setConversation(parsedJson.conversation);
          setTextResponse(parsedJson.startMessage);
        } else {
          console.log("something went wrong when creating conversation");
        }
      }

      if (!asleep && !conversation) {
        CreateConversationWithApi();
      }
    },
    conversation,
    textResponse
  );

  return (
    <Page>
      <Header
        buttons={[
          { path: "/", icon: "home" },
          { path: "/betapet", icon: "betapet" },
          { path: "/chat", icon: "chat" },
        ]}
        currentButtonIndex={2}
      />
      <CenterContainer>
        <ChatContainer>
          <VerticalSpacing height={4} />
          <TextContainer>{textResponse ? textResponse : null}</TextContainer>
          <VerticalSpacing height={4} />
          <TextField
            clearOnSubmit={true}
            color={Color.Depth2}
            onSumbit={async (text) => {
              if (asleep && text.toLowerCase() === "wake up") {
                setAsleep(false);
              }
              let response = await GetChatResponse(conversation, text);
              if (response.status === 200 || response.status === 201) {
                let parsedJson = await response.json();
                setConversation(parsedJson.conversation);
                console.log(getSingleString(parsedJson.responses));
                setTextResponse(getSingleString(parsedJson.responses));
              } else console.log("error when getting response");
            }}
          ></TextField>
        </ChatContainer>
      </CenterContainer>
    </Page>
  );
};

function getSingleString(strings) {
  let result = "";
  strings.forEach((element) => {
    result += element;
  });
  return result;
}

const TextContainer = styled.div`
  color: ${Color.Green};
  font-family: "Roboto";
  font-size: 1rem;
  width: 100%;
  user-select: none;
`;

const ChatContainer = styled.div`
  max-width: 60rem;
  width: 60rem;
  text-align: left;
`;

const Page = styled.div`
  background-color: ${Color.Depth1};
  width: 100vw;
  height: 100vh;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  color: ${Color.White};
  font-family: "Jost";
  font-size: 1.2rem;
`;

export default ChatPage;
