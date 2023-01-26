import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useState, useEffect } from "react";
import { GetStatus } from "../../Api";
import RatingChart from "../RatingChart";
import DialogBox from "../DialogBox";
import { BarLoader } from "react-spinners";
import TextField from "../Input/TextField";
import MatchSummary from "../MatchSummary";
import VerticalSpacing from "../VerticalSpacing";
import { GetTimeSinceDate } from "../../Functions";

const StartPage = () => {
  const [dialogText, setDialogText] = useState(null);
  const [counter, setCounter] = useState(0);
  const [apiKey, setApiKey] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function FetchStatusData() {
      if (!apiKey) return;

      setFetchingStatus(true);
      let response = await GetStatus(apiKey);
      if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        setStatusData(json);
      } else if (response.status == 400) {
        setDialogText("Invalid api key");
      } else {
        setDialogText("Unknown error");
      }
      setFetchingStatus(false);
    }

    if (apiKey && !statusData && !fetchingStatus && !hasFetched) {
      FetchStatusData();
      setHasFetched(true);
    }

    const interval = setInterval(() => {
      setCounter(counter + 1);

      if (counter !== 0 && counter % 60 === 0) {
        //FetchStatusData();
      }
      if (counter !== 0 && counter % 300 === 0) {
        //FetchRatingInfo();
        //FetchMatches();
        setCounter(0);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchingStatus, counter]);

  return (
    <Page>
      <VerticalSpacing height={2} />
      <CenterContainer>
        {!dialogText ? null : (
          <DialogBox
            text={dialogText}
            setDialogText={setDialogText}
            onClose={() => {}}
          />
        )}
        {statusData ? null : fetchingStatus ? (
          <Loader />
        ) : (
          <TextField
            type={"password"}
            onSumbit={(text) => {
              setHasFetched(false);
              setApiKey(text);
            }}
            color={Color.DarkLighter}
            placeHolder={"Enter api key..."}
            title={"Api key"}
          ></TextField>
        )}
      </CenterContainer>
    </Page>
  );
};

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
  background-color: ${Color.DarkLighter};
  max-width: 80vw;
  width: 30rem;
  border-radius: ${BorderRadius.Default};
  padding: 2rem;

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

const Page = styled.div`
  background-color: ${Color.Dark};
  width: 100vw;
  height: 100vh;
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
  background-color: ${Color.DarkLighter};
  max-width: 80vw;
  width: ${(props) => (props.width ? props.width + "rem" : "30rem")};
  border-radius: ${BorderRadius.Default};
  padding: ${(props) => (props.padding ? props.padding + "rem" : "2rem")};

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

const RatingChartContainer = styled.div`
  max-width: 80vw;
  width: 30rem;
  background-color: ${Color.DarkLighter};
  padding: 2rem;
  padding-right: 2.2.rem;
  padding-bottom: 1rem;
  border-radius: ${BorderRadius.Default};

  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.2);
`;

export default StartPage;
