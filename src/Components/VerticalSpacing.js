import styled from "styled-components";

const VerticalSpacing = styled.div`
  min-height: ${(props) => (props.height ? props.height + "rem" : "2rem")};
`;

export default VerticalSpacing;
