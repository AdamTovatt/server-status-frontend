import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useState, useEffect } from "react";
import {
  GetRating,
  GetBetapetStatus,
  GetChatResponse,
  GetMatches,
} from "../../Api";
import RatingChart from "../RatingChart";
import { BarLoader } from "react-spinners";
import TextField from "../Input/TextField";
import MatchSummary from "../MatchSummary";
import VerticalSpacing from "../VerticalSpacing";
import { GetTimeSinceDate } from "../../Functions";
import { keyframes } from "styled-components";
import TabButtons from "../Input/TabButtons";

const BetapetStartPage = () => {
  const [shouldFetchRatingInfo, setShouldFetchRatingInfo] = useState(true);
  const [shouldFetchMatches, setShouldFetchMatches] = useState(true);
  const [shouldFetchStatus, setShouldFetchStatus] = useState(true);

  const [ratingInfo, setRatingInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const [matches, setMatches] = useState(null);

  const [counter, setCounter] = useState(0);
  const [botChatAnswer, setBotChatAnswer] = useState(null);

  useEffect(() => {
    async function FetchRatingInfo() {
      let response = await GetRating();
      if (response.status === 200) {
        let json = await response.json();
        setRatingInfo(json);
      }
    }

    async function FetchStatus() {
      let response = await GetBetapetStatus();
      if (response.status === 200) {
        let json = await response.json();
        setStatus(json);
      }
    }

    async function FetchMatches() {
      let response = await GetMatches();
      if (response.status === 200) {
        let json = await response.json();
        setMatches(json);
      }
    }

    if (shouldFetchMatches) {
      setShouldFetchMatches(false);
      FetchMatches();
    }

    if (shouldFetchRatingInfo) {
      setShouldFetchRatingInfo(false);
      FetchRatingInfo();
    }

    if (shouldFetchStatus) {
      setShouldFetchStatus(false);
      FetchStatus();
    }

    const interval = setInterval(() => {
      setCounter(counter + 1);

      if (counter !== 0 && counter % 60 === 0) {
        setShouldFetchStatus(true);
      }
      if (counter !== 0 && counter % 300 === 0) {
        setShouldFetchRatingInfo(true);
        setShouldFetchMatches(true);
        setCounter(0);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [
    ratingInfo,
    status,
    counter,
    shouldFetchMatches,
    shouldFetchStatus,
    shouldFetchRatingInfo,
  ]);

  return (
    <Page>
      <VerticalSpacing height={0.6} />
      <CenterContainer>
        <TabButtonsContainer>
          <TabButtons
            buttons={[
              { path: "/", icon: "home" },
              { path: "/betapet", icon: "betapet" },
            ]}
            currentButtonIndex={1}
          />
        </TabButtonsContainer>
        <VerticalSpacing height={1} />
        {ratingInfo ? (
          <>
            <RatingChartContainer>
              <RatingChart data={ratingInfo} height={"20rem"}></RatingChart>
            </RatingChartContainer>
          </>
        ) : (
          <LoaderPanel>
            <Loader />
          </LoaderPanel>
        )}
        <VerticalSpacing height={1} />

        {status ? (
          <UserStatsPanel>
            <StatRow>
              <StatColumn>Currently thinking:</StatColumn>
              <StatColumn>{status.handlingThings.toString()}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Last play time:</StatColumn>
              <StatColumn>{GetTimeSinceDate(status.lastPlayTime)}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Current rating:</StatColumn>
              <StatColumn>{status.rating}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Projected rating change:</StatColumn>
              <StatColumn
                color={
                  status.projectedRatingChange > 0 ? Color.Green : Color.Red
                }
              >
                {status.projectedRatingChange > 0
                  ? "+" + status.projectedRatingChange
                  : status.projectedRatingChange}
              </StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Leading:</StatColumn>
              <StatColumn
                color={
                  status.leading > status.activeMatches / 2
                    ? Color.Green
                    : Color.Red
                }
              >
                {Math.round((100 * status.leading) / status.activeMatches) +
                  "%"}
              </StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Leading (rating corrected):</StatColumn>
              <StatColumn
                color={
                  status.leadingRatingCorrected > status.activeMatches / 2
                    ? Color.Green
                    : Color.Red
                }
              >
                {Math.round(
                  (100 * status.leadingRatingCorrected) / status.activeMatches
                ) + "%"}
              </StatColumn>
            </StatRow>
          </UserStatsPanel>
        ) : (
          <LoaderPanel>
            <Loader />
          </LoaderPanel>
        )}
        <VerticalSpacing height={1} />
        {status ? (
          <UserStatsPanel>
            <StatRow>
              <StatColumn>Active matches:</StatColumn>
              <StatColumn>{status.activeMatches}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Opponents waiting for us:</StatColumn>
              <StatColumn>{status.opponentsWaitingForUs}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Matches won:</StatColumn>
              <StatColumn>{status.won}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Matches lost:</StatColumn>
              <StatColumn>{status.lost}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Total matches:</StatColumn>
              <StatColumn>{status.won + status.lost}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Bingos:</StatColumn>
              <StatColumn>{status.bingos}</StatColumn>
            </StatRow>
            <VerticalSpacing height={0.4} />
            <StatRow>
              <StatColumn>Average time per move:</StatColumn>
              <StatColumn>
                {status.averageTimePerMove
                  ? status.averageTimePerMove / 1000 + " s"
                  : "?"}
              </StatColumn>
            </StatRow>
          </UserStatsPanel>
        ) : (
          <LoaderPanel>
            <Loader />
          </LoaderPanel>
        )}
        <VerticalSpacing height={1} />
        <TextField
          onSumbit={(text) => {
            GetApiResponseOnChat(text, setBotChatAnswer);
          }}
          color={Color.Depth2}
          placeHolder={"Write a message to test the response..."}
          title={"Test the chat function"}
        ></TextField>
        <VerticalSpacing height={1} />
        {botChatAnswer ? (
          <>
            <UserStatsPanel>
              <StatRow>
                <StatColumn>{botChatAnswer}</StatColumn>
              </StatRow>
            </UserStatsPanel>
            <VerticalSpacing height={1} />
          </>
        ) : null}
        <VerticalSpacing height={1} />
        <UserPanelTitle>Matches</UserPanelTitle>
        {matches ? (
          <UserStatsPanel padding={2}>
            {matches.map((match, index) => (
              <div key={index}>
                <MatchSummary match={match} />
                <VerticalSpacing height={0.8} />
              </div>
            ))}
          </UserStatsPanel>
        ) : (
          <LoaderPanel>
            <Loader />
          </LoaderPanel>
        )}
        <VerticalSpacing height={2} />
      </CenterContainer>
    </Page>
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

async function GetApiResponseOnChat(message, setMessage) {
  let result = await GetChatResponse(message);

  if (result.status === 200) {
    let json = await result.json();
    setMessage(json.message);
  }
}

const Loader = () => {
  return (
    <BarLoader
      color={Color.Purple}
      height={17}
      speedMultiplier={1.2}
      width={400}
    />
  );
};

const LoaderPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.Depth2};
  max-width: 80vw;
  width: 30rem;
  border-radius: ${BorderRadius.Default};
  padding: 2rem;

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

const Page = styled.div`
  background-color: ${Color.Depth1};
  width: 100%;
  height: 100%;
`;

const UserPanelTitle = styled.div`
  margin-bottom: 0.4rem;
  text-align: center;
  width: 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  color: ${Color.White};
  font-family: "Jost";
  font-size: 1.2rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatColumn = styled.div`
  color: ${(props) =>
    props ? (props.color ? props.color : Color.White) : Color.White};
`;

const UserStatsPanel = styled.div`
  background-color: ${Color.Depth2};
  max-width: 80vw;
  width: ${(props) => (props.width ? props.width + "rem" : "30rem")};
  border-radius: ${BorderRadius.Default};
  padding: ${(props) => (props.padding ? props.padding + "rem" : "2rem")};

  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);

  animation: ${scaleOnShow} 0.2s ease forwards;
`;

const TabButtonsContainer = styled.div`
  background-color: ${Color.Depth2};
  max-width: 95vw;
  width: ${(props) => (props.width ? props.width + "rem" : "34rem")};
  border-radius: ${BorderRadius.Default};
`;

const RatingChartContainer = styled.div`
  max-width: 80vw;
  width: 30rem;
  background-color: ${Color.Depth2};
  padding: 2rem;
  padding-right: 2.2.rem;
  padding-bottom: 1rem;
  border-radius: ${BorderRadius.Default};

  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);

  animation: ${scaleOnShow} 0.2s ease forwards;
`;

export default BetapetStartPage;
