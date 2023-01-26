import styled from "styled-components";
import { Color as Constants, BorderRadius } from "./Constants";
import { PulseLoader as Loader } from "react-spinners";
import { useState } from "react";

const ThinButton = ({ children, Color, Width, TextColor, onClick, id }) => {
  const [loading, setLoading] = useState(false);

  return (
    <ThinButtonDiv
      disabled={loading}
      id={id}
      onClick={
        onClick
          ? async () => {
              setLoading(true);
              await onClick();
              setLoading(false);
            }
          : onClick
      }
      Color={Color}
      Width={Width}
      TextColor={TextColor}
    >
      {loading ? (
        <LoadingContainer>
          <LoaderFrame>
            <Loader color={TextColor ? TextColor : Constants.White} />
          </LoaderFrame>
        </LoadingContainer>
      ) : (
        children
      )}
    </ThinButtonDiv>
  );
};

const LoaderFrame = styled.div`
  margin-top: 0.15rem;
`;

const LoadingContainer = styled.div`
  height: 1.4rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const ThinButtonDiv = styled.button`
  background-color: ${(props) => (props.Color ? props.Color : Constants.Blue)};
  font-size: 1em;
  font-family: "Jost";
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: ${(props) => (props.Width ? props.Width : "18rem")};
  border-radius: ${BorderRadius.Default};
  border: none;
  color: ${(props) => (props.TextColor ? props.TextColor : Constants.White)};

  cursor: pointer;

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

export default ThinButton;
