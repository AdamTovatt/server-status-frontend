import styled from "styled-components";
import { BorderRadius, Color } from "./Constants";
import { useState } from "react";
import { keyframes } from "styled-components";

const Console = ({ text, title, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [keyCounter, setKeyCounter] = useState(1);

  return (
    <ConsoleBackground open={open} key={keyCounter}>
      {title ? (
        <ConsoleTitle
          open={open}
          onClick={() => {
            setOpen(!open);
            if (!open) setKeyCounter(keyCounter + 1);
          }}
        >
          <ConsoleTitleText>{title}</ConsoleTitleText>
        </ConsoleTitle>
      ) : null}
      {open ? <ConsoleText>{text}</ConsoleText> : null}
    </ConsoleBackground>
  );
};

const scaleOnShow = keyframes`
  0%
  {
    transform-origin: top left;
    transform: scale( 1, 0.4 );
  }
  100%
  {
    transform-origin: top left;
    transform: scale(1, 1);
  }
`;

const ConsoleTitleText = styled.div`
  padding-left: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  font-size: 1rem;
  font-family: "Jost";
`;

const ConsoleTitle = styled.div`
  background-color: ${Color.Depth3};
  width: 100%;
  border-radius: ${(props) =>
    props.open ? "12px 12px 0px 0px" : "12px 12px 12px 12px"};
  cursor: pointer;
  user-select: none;
  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
`;

const ConsoleBackground = styled.div`
  background-color: ${Color.Depth3};
  border-radius: 12px;
  width: 100%;
  white-space: pre-line;
  font-family: "Roboto";
  font-size: 0.9rem;
  cursor: text;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  -webkit-box-shadow: 0px 3px 3px 0px
    rgba(0, 0, 0, ${(props) => (!props.open ? "0" : "0.1")});
  box-shadow: 0px 3px 3px 0px
    rgba(0, 0, 0, ${(props) => (!props.open ? "0" : "0.1")});
  //animation: ${scaleOnShow} 0.2s ease forwards;
`;

const ConsoleText = styled.div`
  width: calc(100% - 2rem);
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export default Console;
