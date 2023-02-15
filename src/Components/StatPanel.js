import HorizontalSpacing from "./HorizontalSpacing";
import { Color, BorderRadius } from "./Constants";
import styled from "styled-components";
import { scaleOnShow } from "../Animations";

const StatPanel = ({ children, padding }) => {
  return (
    <StatPanelBackground>
      <HorizontalSpacing width={padding ? padding : 1} />
      <StatRowContainer>{children}</StatRowContainer>
      <HorizontalSpacing width={padding ? padding : 1} />
    </StatPanelBackground>
  );
};

const StatPanelBackground = styled.div`
  background-color: ${Color.Depth2};
  width: 100%; // ${(props) => (props.width ? props.width + "rem" : "30rem")};
  border-radius: ${BorderRadius.Default};
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;

  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);

  animation: ${scaleOnShow} 0.2s ease forwards;
`;

const StatRowContainer = styled.div`
  width: 100%;
`;

export default StatPanel;
