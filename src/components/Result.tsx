import { useStateStore } from "@/state/provider";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { addMinute, addHour, dayStart, format } from "@formkit/tempo";
import { State } from "@/state/store";
import { Chart, ChartProps } from "./BarChart";
import { HOUR_IN_MILLISECONDS, MINUTE_IN_MILLISECONDS } from "@/lib/constants";

function Result() {
  const { totalCards, ...state } = useStateStore((store) => {
    return {
      totalCards: store.breaks.length + 3,
      breaks: store.breaks,
      here: store.here,
      leaving: store.leaving,
    };
  });

  const { time, data } = calcTimeDiff(state);

  return (
    <Card id={"Here"} index={totalCards} totalCards={totalCards} key={"Here"}>
      <div className="flex h-full flex-col items-center justify-center gap-y-3 rounded-lg border-2 border-slate-300 p-5 ">
        <Label className="text-xl">Result</Label>
        <Label>
          Hours: {time.getHours()} Minutes: {time.getMinutes()}
        </Label>
        <Chart data={data} />
      </div>
    </Card>
  );
}

export default Result;

//  calc diff between first here and first break
// * this diff will be here and break.away at index 0
//  calc diffs for each break obj
// * this diff will be break.back of index i and break.away of i + 1
//  calc diff between last break and leaving
// * this diff will be leaving and break.back at index lastIndex
//  sum all diffs to calc result
const calcTimeDiff = ({
  here,
  breaks,
  leaving,
}: Omit<State, "step">): { time: Date; data: ChartProps["data"] } => {
  let startTime = dayStart(new Date());
  startTime = addHour(startTime, here.hour);
  startTime = addMinute(startTime, here.minute);

  let endTime = dayStart(new Date());
  endTime = addHour(endTime, leaving.hour);
  endTime = addMinute(endTime, leaving.minute);

  const data = [];
  for (let index = 0; index < breaks.length; index++) {
    const breakObj = breaks[index];
    let away = dayStart(new Date());
    away = addHour(away, breakObj?.away.hour);
    away = addMinute(away, breakObj?.away.minute);

    let back = dayStart(new Date());
    back = addHour(away, breakObj?.back.hour);
    back = addMinute(away, breakObj?.back.minute);

    let diffInMilliseconds;
    let time;

    if (index === 0) {
      diffInMilliseconds = away.valueOf() - startTime.valueOf();
      time = `${format(startTime, { time: "medium" })} - ${format(away, { time: "medium" })}`;
      data.push({
        time,
        timeWorked: diffInMilliseconds,
      });
    }
    if (index === breaks.length - 1) {
      diffInMilliseconds = endTime.valueOf() - back.valueOf();
      time = `${format(back, { time: "medium" })} - ${format(endTime, { time: "medium" })}`;
      data.push({
        time,
        timeWorked: diffInMilliseconds,
      });
    }

    if (breaks.length > 1) {
      let awayNextIndex = dayStart(new Date());
      awayNextIndex = addHour(awayNextIndex, breaks[index + 1]?.away.hour);
      awayNextIndex = addMinute(awayNextIndex, breaks[index + 1]?.away.minute);
      diffInMilliseconds = awayNextIndex.valueOf() - back.valueOf();
      time = `${format(back, { time: "medium" })} - ${format(awayNextIndex, { time: "medium" })}`;
      data.push({
        time,
        timeWorked: diffInMilliseconds,
      });
    }
  }

  let totalDiffInMilliseconds = 0;
  data.map(({ timeWorked }) => {
    totalDiffInMilliseconds += timeWorked!;
  });

  let result = dayStart(new Date());
  result = addHour(
    result,
    Math.floor(totalDiffInMilliseconds / HOUR_IN_MILLISECONDS),
  );
  result = addMinute(
    result,
    Math.floor(
      (totalDiffInMilliseconds % HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS,
    ),
  );

  return {
    time: result,
    data,
  };
};
