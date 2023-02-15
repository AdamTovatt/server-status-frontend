import styled from "styled-components";
import { Color } from "./Constants";
import VerticalSpacing from "./VerticalSpacing";

const StatRow = ({ leftText, rightText, rightColor, leftColor, noPadding }) => {
  return (
    <>
      <StatRowContainer>
        <StatColumn color={leftColor}>{leftText}</StatColumn>
        <StatColumn color={rightColor}>{rightText}</StatColumn>
      </StatRowContainer>
      <VerticalSpacing height={0.4} />
    </>
  );
};

const StatRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatColumn = styled.div`
  color: ${(props) =>
    props ? (props.color ? props.color : Color.White) : Color.White};
`;

export default StatRow;
