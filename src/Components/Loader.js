import { BarLoader } from "react-spinners";
import { Color, BorderRadius } from "./Constants";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderPanel>
      <BarLoader
        color={Color.Purple}
        height={17}
        speedMultiplier={1.2}
        width={"100%"}
      />
    </LoaderPanel>
  );
};

const LoaderPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.Depth2};
  max-width: 100%;
  border-radius: ${BorderRadius.Default};
  padding: 2rem;

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

export default Loader;
