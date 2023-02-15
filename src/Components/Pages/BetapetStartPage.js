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
import TextField from "../Input/TextField";
import MatchSummary from "../MatchSummary";
import VerticalSpacing from "../VerticalSpacing";
import { GetTimeSinceDate } from "../../Functions";
import { keyframes } from "styled-components";
import TabButtons from "../Input/TabButtons";
import Loader from "../Loader";
import HorizontalSpacing from "../HorizontalSpacing";
import StatRow from "../StatRow";
import StatPanel from "../StatPanel";

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
          <PanelContainer>
            <RatingChart data={ratingInfo} height={"20rem"}></RatingChart>
          </PanelContainer>
        ) : (
          <PanelContainer>
            <Loader />
          </PanelContainer>
        )}
        <VerticalSpacing height={1} />

        {status ? (
          <PanelContainer>
            <StatPanel>
              <StatRow
                leftText={"Currently thinking:"}
                rightText={status.handlingThings.toString()}
              />
              <StatRow
                leftText={"Last play time:"}
                rightText={GetTimeSinceDate(status.lastPlayTime)}
              />
              <StatRow leftText={"Current rating:"} rightText={status.rating} />
              <StatRow
                leftText={"Projected rating change:"}
                rightText={
                  status.projectedRatingChange > 0
                    ? "+" + status.projectedRatingChange
                    : status.projectedRatingChange
                }
                rightColor={
                  status.projectedRatingChange > 0 ? Color.Green : Color.Red
                }
              />
              <StatRow
                leftText={"Leading:"}
                rightText={
                  Math.round((100 * status.leading) / status.activeMatches) +
                  "%"
                }
                rightColor={
                  status.leading > status.activeMatches / 2
                    ? Color.Green
                    : Color.Red
                }
              />
              <StatRow
                leftText={"Leading (rating corrected):"}
                rightText={
                  Math.round(
                    (100 * status.leadingRatingCorrected) / status.activeMatches
                  ) + "%"
                }
                rightColor={
                  status.leadingRatingCorrected > status.activeMatches / 2
                    ? Color.Green
                    : Color.Red
                }
              />
            </StatPanel>
          </PanelContainer>
        ) : (
          <PanelContainer>
            <Loader />
          </PanelContainer>
        )}
        <VerticalSpacing height={1} />
        {status ? (
          <PanelContainer>
            <StatPanel>
              <StatRow
                leftText={"Active matches:"}
                rightText={status.activeMatches}
              />
              <StatRow
                leftText={"Opponents waiting for us:"}
                rightText={status.opponentsWaitingForUs}
              />
              <StatRow leftText={"Matches won:"} rightText={status.won} />
              <StatRow leftText={"Matches lost:"} rightText={status.lost} />
              <StatRow
                leftText={"Total matches:"}
                rightText={status.won + status.lost}
              />
              <StatRow leftText={"Bingos:"} rightText={status.bingos} />
              <StatRow
                leftText={"Average time per move:"}
                rightText={
                  status.averageTimePerMove
                    ? status.averageTimePerMove / 1000 + " s"
                    : "?"
                }
              />
            </StatPanel>
          </PanelContainer>
        ) : (
          <PanelContainer>
            <Loader />
          </PanelContainer>
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
          <PanelContainer>
            <StatPanel>
              <StatRow leftText={botChatAnswer} />
            </StatPanel>
            <VerticalSpacing height={1} />
          </PanelContainer>
        ) : null}
        <VerticalSpacing height={1} />
        <UserPanelTitle>Matches</UserPanelTitle>
        {matches ? (
          <PanelContainer>
            <StatPanel padding={1}>
              {matches.map((match, index) => (
                <div key={index}>
                  <MatchSummary match={match} />
                  <VerticalSpacing height={0.8} />
                </div>
              ))}
            </StatPanel>
          </PanelContainer>
        ) : (
          <PanelContainer>
            <Loader />
          </PanelContainer>
        )}
        <VerticalSpacing height={2} />
      </CenterContainer>
    </Page>
  );
};

async function GetApiResponseOnChat(message, setMessage) {
  let result = await GetChatResponse(message);

  if (result.status === 200) {
    let json = await result.json();
    setMessage(json.message);
  }
}

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

const PanelContainer = styled.div`
  min-width: 15rem;
  width: 60rem;
  max-width: 95vw;
`;

const TabButtonsContainer = styled.div`
  background-color: ${Color.Depth2};
  max-width: 95vw;
  width: ${(props) => (props.width ? props.width + "rem" : "34rem")};
  border-radius: ${BorderRadius.Default};
`;

export default BetapetStartPage;
