import { Link } from "react-router-dom";
import styled from "styled-components";
import { BorderRadius, Color } from "./Constants";

const Header = ({ buttons, currentButtonIndex }) => {
  return (
    <ButtonsContainer>
      {buttons.map((button, index) => {
        return (
          <Link
            key={index}
            style={{ flex: 1, maxWidth: "10rem" }}
            to={button.path}
          >
            <TabButton active={index === currentButtonIndex}>
              {button.icon}
            </TabButton>
          </Link>
        );
      })}
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.div`
  width: 100%;
  background-color: ${Color.Depth2};
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: row;
  min-height: 3rem;

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? Color.Depth3 : Color.Depth2)};
  border: none;
  font-family: "Jost";
  color: ${Color.White};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  max-width: 10rem;

  box-shadow: 0px 0px 4px 0px
    rgba(0, 0, 0, ${(props) => (props.active ? 0.2 : 0)});
`;

export default Header;
