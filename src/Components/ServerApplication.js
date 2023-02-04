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
            <LeftAlignedHeader>
              <Title>
                <StatusHeader
                  status={serverApplication.status}
                  subStatus={serverApplication.subStatus}
                />
              </Title>
              <Title>{serverApplication.configuration.name}</Title>
            </LeftAlignedHeader>
            <Title>^</Title>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <Title>Last build time:</Title>
            <Title>
              {GetTimeSinceDate(serverApplication.configuration.lastBuildTime)}
            </Title>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <ConsoleBackground>
              {serverApplication.configuration.buildLog}
            </ConsoleBackground>
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
            <LeftAlignedHeader>
              <Title>
                <StatusHeader
                  status={serverApplication.status}
                  subStatus={serverApplication.subStatus}
                />
              </Title>
              <Title>{serverApplication.configuration.name}</Title>
            </LeftAlignedHeader>
            <Title>V</Title>
          </Columns>
        </Row>
      )}
    </ApplicationBackground>
  );
};

const LeftAlignedHeader = styled.div`
  display: flex;
  align-items: left;
`;

const StatusHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
`;

const StatusHeader = ({ status, subStatus }) => {
  let statusColor = status
    ? status === "active"
      ? Color.Green
      : Color.Yellow
    : Color.Red;
  let subStatusColor = subStatus
    ? status === "active"
      ? Color.Green
      : Color.Yellow
    : Color.Red;
  return (
    <StatusHeaderContainer>
      <StatusHeaderText color={statusColor}>o</StatusHeaderText>
      <StatusHeaderText color={subStatusColor}>o</StatusHeaderText>
    </StatusHeaderContainer>
  );
};

const StatusHeaderText = styled.div`
  color: ${(props) => props.color};
`;

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
  min-height: 1.5rem;
  border-radius: ${BorderRadius.Default};
  display: flex;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export default ServerApplication;
