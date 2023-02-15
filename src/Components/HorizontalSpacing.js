import styled from "styled-components";

const HorizontalSpacing = styled.div`
  min-width: ${(props) => (props.width ? props.width + "rem" : "2rem")};
`;

export default HorizontalSpacing;
