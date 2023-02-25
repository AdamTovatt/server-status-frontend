import { useEffect, useState } from "react";
import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { ReactComponent as SendIcon } from "./Assets/send.svg";

const TextField = ({
  title,
  placeHolder,
  type,
  setState,
  onSumbit,
  width,
  color,
  clearOnSubmit,
}) => {
  const [text, setText] = useState(null);

  return (
    <TextFieldContainer>
      <TextAreaTitle>{title}</TextAreaTitle>
      <ButtonAndFieldContainer>
        <CustomTextArea
          color={color}
          Width={width}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (onSumbit) onSumbit(text);
              console.log("clear: " + clearOnSubmit);
              if (clearOnSubmit) {
                setText(null);
                event.target.value = "";
              }
            }
          }}
          onChange={(event) => {
            setText(event.target.value);
            if (setState) {
              setState(event.target.value);
            }
          }}
          type={type}
          placeholder={placeHolder}
        />
        <SubmitButton
          color={color}
          onClick={() => {
            if (onSumbit) onSumbit(text);
            if (clearOnSubmit) {
              setText(null);
            }
          }}
        >
          <SendIcon
            height={"2rem"}
            width={"3rem"}
            style={{
              color: Color.Depth2,
            }}
          ></SendIcon>
        </SubmitButton>
      </ButtonAndFieldContainer>
    </TextFieldContainer>
  );
};

const ButtonAndFieldContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SubmitButton = styled.button`
  width: 5rem;
  background-color: ${Color.Purple};
  border: 0.3rem solid ${Color.Depth2};
  border-radius: 0 ${BorderRadius.Default} ${BorderRadius.Default} 0;
  cursor: pointer;

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextAreaTitle = styled.div`
  text-align: left;
  padding-left: 0.9rem;
  margin-bottom: 0.2rem;
  font-size: 16px;
  font-weight: 400;
`;

const CustomTextArea = styled.input`
  width: 100%;
  background-color: ${(props) => (props.color ? props.color : Color.Blue)};
  border: none;
  border-radius: ${BorderRadius.Default} 0 0 ${BorderRadius.Default};
  resize: none;
  outline: none;
  padding: 2rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  min-height: 1.25rem;
  max-height: 1.25rem;
  font-family: "Jost";
  font-size: 16px;
  overflow: hidden;
  color: ${Color.White};

  ::placeholder {
    color: ${Color.White};
    opacity: 0.5;
  }

  -webkit-appearance: none !important;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

export default TextField;
