import { Link } from "react-router-dom";
import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";

const TabButtons = ({ buttons, currentButtonIndex }) => {
  return (
    <ButtonsContainer>
      {buttons.map((button, index) => {
        return (
          <Link style={{ flex: 1 }} to={button.path}>
            <TabButton
              key={index}
              borderRadius={getBorderRadius(
                index === 0 ? -1 : index === buttons.length - 1 ? 1 : 0
              )}
              active={index === currentButtonIndex}
            >
              {button.icon}
            </TabButton>
          </Link>
        );
      })}
    </ButtonsContainer>
  );
};

function getBorderRadius(side) {
  if (side === 0) {
    //middle
    return "0px 0px 0px 0px";
  } else if (side === -1) {
    //left
    return "12px 0px 0px 12px";
  }
  return "0px 12px 12px 0px"; //right
}

const ButtonsContainer = styled.div`
  width: 100%;
  background-color: ${Color.Depth2};
  display: flex;
  justify-content: center;
  border-radius: ${BorderRadius.Default};

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? Color.Depth4 : Color.Depth3)};
  border-radius: ${(props) => props.borderRadius};
  border: none;
  font-family: "Jost";
  color: ${Color.White};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  flex: 1;
  cursor: pointer;
  width: 100%;

  box-shadow: 0px 0px 4px 0px
    rgba(0, 0, 0, ${(props) => (props.active ? 0.2 : 0)});
`;

export default TabButtons;
