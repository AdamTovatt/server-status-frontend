import styled from "styled-components";
import { BorderRadius, Color } from "../Constants";
import { useState, useEffect } from "react";
import { GetIsServer, GetStatus } from "../../Api";
import RatingChart from "../RatingChart";
import DialogBox from "../DialogBox";
import { BarLoader } from "react-spinners";
import TextField from "../Input/TextField";
import ServerApplication from "../ServerApplication";
import VerticalSpacing from "../VerticalSpacing";
import { GetTimeSinceDate, setCookie } from "../../Functions";
import Cookies from "universal-cookie";
import Console from "../Console";

const StartPage = () => {
  const [dialogText, setDialogText] = useState(null);
  const [counter, setCounter] = useState(0);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [openName, setOpenName] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [lastRebuildTime, setLastRebuildTime] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    async function FetchStatusData() {
      setFetchingStatus(true);
      try {
        let response = await GetStatus(cookies.get("apiKey"));
        if (response.status === 200) {
          let json = await response.json();
          console.log(json);
          setStatusData(json);
        } else if (response.status === 400) {
          setDialogText("Invalid api key");
          setCookie("apiKey", null);
          setApiKey(null);
        } else {
          setDialogText("Unknown error");
        }
      } catch (e) {
        setDialogText("An error occured when fetching the status: " + e);
      }
      setFetchingStatus(false);
      console.log("not fetching anymore");
    }

    if (cookies.get("apiKey") && !fetchingStatus && !hasFetched) {
      FetchStatusData();
      setHasFetched(true);
      setApiKey(cookies.get("apiKey"));
    }

    const interval = setInterval(() => {
      setCounter(counter + 1);

      if (
        counter !== 0 &&
        counter % GetUpdateFrequency(lastRebuildTime) === 0
      ) {
        setHasFetched(false);
        //FetchStatusData();
      }
      if (counter !== 0 && counter % 300 === 0) {
        setCounter(0);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [
    fetchingStatus,
    counter,
    hasFetched,
    statusData,
    lastRebuildTime,
    cookies,
  ]);

  return (
    <Page>
      <VerticalSpacing height={1} />
      <CenterContainer>
        {!dialogText ? null : (
          <DialogBox
            text={dialogText}
            setDialogText={setDialogText}
            onClose={() => {}}
          />
        )}
        {statusData ? (
          <ServerApplicationContainer>
            <Console
              defaultOpen={true}
              title={"System information"}
              text={
                "time: " +
                new Date(Date.parse(statusData.topCommand.time + "+00:00"))
                  .toString()
                  .split(" ")[4] +
                "\ntemperature: " +
                statusData.temperature.temperature +
                "°C\nuptime: " +
                statusData.topCommand.uptime +
                "\nCpu: " +
                Math.round(statusData.topCommand.totalCpuUsage * 100) / 100 +
                "%" +
                "\n15 min load average: " +
                Math.round(statusData.topCommand.loadAverage5Minute * 100) /
                  100 +
                "%"
              }
            />
            {statusData.applications.map((data, index) => (
              <div key={index}>
                <ServerApplication
                  didRequestRebuild={() => {
                    setHasFetched(false);
                    setLastRebuildTime(Date.now());
                  }}
                  apiKey={apiKey}
                  serverApplication={data}
                  open={data.configuration.name === openName}
                  onClick={() => {
                    if (openName === data.configuration.name) setOpenName(null);
                    else setOpenName(data.configuration.name);
                  }}
                />
                <VerticalSpacing height={0.5} />
              </div>
            ))}
          </ServerApplicationContainer>
        ) : fetchingStatus ? (
          <Loader />
        ) : (
          <TextField
            type={"password"}
            onSumbit={(text) => {
              setHasFetched(false);
              setCookie("apiKey", text);
            }}
            color={Color.Depth2}
            placeHolder={"Enter api key..."}
            title={"Api key"}
          ></TextField>
        )}
      </CenterContainer>
    </Page>
  );
};

function GetUpdateFrequency(lastRebuildTime) {
  if (!lastRebuildTime) return 10; //default frequency

  let seconds = (Date.now() - new Date(lastRebuildTime)) / 1000;

  if (seconds < 30) return 1;
  else if (seconds < 60) return 2;
  else if (seconds < 120) return 5;

  return 10;
}

const ServerApplicationContainer = styled.div`
  min-width: 15rem;
  width: 60rem;
  max-width: 95vw;
`;

const Loader = () => {
  return (
    <BarLoader
      color={Color.Purple}
      height={12}
      speedMultiplier={1.2}
      width={200}
    />
  );
};

const Page = styled.div`
  background-color: ${Color.Depth1};
  width: 100vw;
  height: 100vh;
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

export default StartPage;
