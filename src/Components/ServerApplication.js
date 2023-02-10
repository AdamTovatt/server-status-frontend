import styled from "styled-components";
import { GetTimeSinceDate } from "../Functions";
import { BorderRadius, Color } from "./Constants";
import VerticalSpacing from "./VerticalSpacing";
import ThinButton from "./ThinButton";
import { GetLog, StartBuild } from "../Api";
import Console from "./Console";
import { keyframes } from "styled-components";
import { useState } from "react";
import { ChevronDown, ChevronUp, Circle } from "react-feather";

const ServerApplication = ({
  apiKey,
  serverApplication,
  open,
  onClick,
  didRequestRebuild,
}) => {
  const [applicationLog, setApplicationLog] = useState(null);

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
            <Title>
              <ChevronContainer negative={true}>
                <ChevronUp />
              </ChevronContainer>
            </Title>
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <Title>Status:</Title>
            <Title>{serverApplication.status}</Title>
          </Columns>
          <VerticalSpacing height={0.5} />
          <Columns>
            <Title>Substatus:</Title>
            <Title>{serverApplication.subStatus}</Title>
          </Columns>
          <VerticalSpacing height={0.6} />
          <Columns>
            <Console
              title={"Application log"}
              text={applicationLog}
              wasOpened={async () => {
                let response = await GetLog(
                  apiKey,
                  serverApplication.configuration.name
                );

                if (response.status === 200) {
                  setApplicationLog((await response.json()).log);
                } else {
                  setApplicationLog(
                    "Error when getting application log, error code: " +
                      response.status
                  );
                }
              }}
            />
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
            <Console
              text={serverApplication.configuration.buildLog}
              title={"Build log"}
            />
          </Columns>
          <VerticalSpacing height={1} />
          <Columns>
            <Title>Start rebuild:</Title>
            <ThinButton
              onClick={async () => {
                let response = await StartBuild(
                  apiKey,
                  serverApplication.configuration.name
                );
                if (didRequestRebuild) didRequestRebuild(response);
              }}
              Color={Color.Purple}
              TextColor={Color.Depth1}
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
            <RightAlignedHeader>
              <Title>
                <DetailsHeaderContainer>
                  {serverApplication.cpuUsage === -1
                    ? null
                    : Math.round(serverApplication.cpuUsage * 10) / 10 + "%"}
                </DetailsHeaderContainer>
              </Title>
              <Title>
                <ChevronContainer>
                  <ChevronDown />
                </ChevronContainer>
              </Title>
            </RightAlignedHeader>
          </Columns>
        </Row>
      )}
    </ApplicationBackground>
  );
};

const RightAlignedHeader = styled.div`
  display: flex;
  align-items: right;
`;

const DetailsHeaderContainer = styled.div`
  margin-right: 1rem;
`;

const LeftAlignedHeader = styled.div`
  display: flex;
  align-items: left;
`;

const StatusHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
      <StatusHeaderText color={statusColor}>
        <Circle fill={subStatusColor} />
      </StatusHeaderText>
    </StatusHeaderContainer>
  );
};

const scaleOnShow = keyframes`
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

const turnAround = keyframes`
 0%
 {
  transform: rotate(180deg);
 }
 100%
 {
  transform: rotate(0deg);
 }
`;

const turnAroundNegative = keyframes`
 0%
 {
  transform: rotate(-180deg);
 }
 100%
 {
  transform: rotate(0deg);
 }
`;

const ChevronContainer = styled.div`
  animation: ${(props) => (props.negative ? turnAroundNegative : turnAround)}
    0.2s ease forwards;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

const StatusHeaderText = styled.div`
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
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
  user-select: none;
  display: flex;
  align-items: center;
`;

const ApplicationBackground = styled.div`
  background-color: ${Color.Depth2};
  font-family: "Jost";
  width: 100%;
  min-height: 1.5rem;
  border-radius: ${BorderRadius.Default};
  display: flex;
  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  animation: ${scaleOnShow} 0.2s ease forwards;
`;

export default ServerApplication;
