import styled from "styled-components";
import { GetTimeSinceDate } from "../Functions";
import { BorderRadius, Color } from "./Constants";
import VerticalSpacing from "./VerticalSpacing";
import ThinButton from "./ThinButton";
import { StartBuild } from "../Api";

const ServerApplication = ({
  apiKey,
  serverApplication,
  open,
  onClick,
  didRequestRebuild,
}) => {
  return (
    <ApplicationBackground>
      {open ? (
        <Row>
          <Columns style={{ cursor: "pointer" }} onClick={() => onClick()}>
            <Title>{serverApplication.name}</Title>
            <Title>^</Title>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <Title>Last build time:</Title>
            <Title>{GetTimeSinceDate(serverApplication.lastBuildTime)}</Title>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <ConsoleBackground>{serverApplication.buildLog}</ConsoleBackground>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <Title>Start rebuild:</Title>
            <ThinButton
              onClick={async () => {
                await StartBuild(apiKey, serverApplication.name);
                if (didRequestRebuild) didRequestRebuild();
              }}
              Color={Color.Purple}
              TextColor={Color.Dark}
            >
              Rebuild
            </ThinButton>
          </Columns>
        </Row>
      ) : (
        <Row>
          <Columns style={{ cursor: "pointer" }} onClick={() => onClick()}>
            <Title>{serverApplication.name}</Title>
            <Title>V</Title>
          </Columns>
        </Row>
      )}
    </ApplicationBackground>
  );
};

const ConsoleBackground = styled.div`
  background-color: ${Color.DarkLightest};
  padding: 1rem;
  border-radius: 12px;
  width: 100%;
  white-space: pre-line;
  font-family: "Roboto";
  font-size: 0.9rem;
  cursor: text;
  margin-bottom: 2rem;
`;

const Columns = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.2rem;
`;

const ApplicationBackground = styled.div`
  background-color: ${Color.DarkLighter};
  font-family: "Jost";
  width: 100%;
  min-height: 3rem;
  border-radius: ${BorderRadius.Default};
  display: flex;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export default ServerApplication;
