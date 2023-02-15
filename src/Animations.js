import { keyframes } from "styled-components";

export const scaleOnShow = keyframes`
  0%
  {
    transform: scale( 1, 0.1 );
  }
  60%
  {
    transform: scale( 1, 1.1 );
  }
  95%
  {
    transform: scale(1, 0.98);
  }
  100%
  {
    transform: scale(1, 1);
  }
`;
