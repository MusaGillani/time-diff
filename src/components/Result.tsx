import { useStateStore } from "@/state/provider";
import { Label } from "./ui/label";
import { addMinute, addHour, dayStart, format } from "@formkit/tempo";
import { State, Steps } from "@/state/store";
import { Chart, ChartProps } from "./BarChart";
import { HOUR_IN_MILLISECONDS, MINUTE_IN_MILLISECONDS } from "@/lib/constants";

function Result() {
  const shifts = useStateStore((store) => store.shifts);

  const { time, data } = calcTimeDiff({ shifts });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-3 rounded-lg border-2 border-slate-300 p-5 ">
      <Label className="text-xl">Result</Label>
      <Label>
        Hours: {time.getHours()} Minutes: {time.getMinutes()}
      </Label>
      <Chart data={data} />
    </div>
  );
}

export default Result;

// calc diffs between all entries except AWAY and BACK
const calcTimeDiff = ({
  shifts,
}: State): {
  time: Date;
  data: ChartProps["data"];
} => {
  let totalDiffInMilliseconds = 0;
  const data = [];

  loop: for (let i = 0; i < shifts.length - 1; i++) {
    if (shifts[i].step === Steps.AWAY && shifts[i + 1].step === Steps.BACK)
      continue loop;
    let startTime = dayStart(new Date());
    startTime = addHour(startTime, shifts[i].time.hour);
    startTime = addMinute(startTime, shifts[i].time.minute);

    let endTime = dayStart(new Date());
    endTime = addHour(endTime, shifts[i + 1].time.hour);
    endTime = addMinute(endTime, shifts[i + 1].time.minute);

    const diffInMilliseconds = endTime.valueOf() - startTime.valueOf();
    totalDiffInMilliseconds += diffInMilliseconds;
    data.push({
      time: `${format(startTime, { time: "medium" })} - ${format(endTime, { time: "medium" })}`,
      timeWorked: diffInMilliseconds,
    });
  }
  let time = dayStart(new Date());
  time = addHour(
    time,
    Math.floor(totalDiffInMilliseconds / HOUR_IN_MILLISECONDS),
  );
  time = addMinute(
    time,
    Math.floor(
      (totalDiffInMilliseconds % HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS,
    ),
  );
  return {
    time,
    data,
  };
};
