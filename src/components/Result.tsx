import { useStateStore } from "@/state/provider";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { addMinute, addHour, dayStart } from "@formkit/tempo";
import { State } from "@/state/store";

function Result() {
  const { totalCards, ...state } = useStateStore((store) => {
    return {
      totalCards: store.breaks.length + 3,
      breaks: store.breaks,
      here: store.here,
      leaving: store.leaving,
    };
  });

  const result = calcTimeDiff(state);

  return (
    <Card id={"Here"} index={totalCards} totalCards={totalCards} key={"Here"}>
      <div className="flex flex-col gap-y-3 rounded-lg border-2 border-slate-300 p-5 ">
        <Label>Result:</Label>
        <Label>
          Hours: {result.getHours()} Minutes: {result.getMinutes()}
        </Label>
      </div>
    </Card>
  );
}

export default Result;

const calcTimeDiff = ({ here, breaks, leaving }: Omit<State, "step">): Date => {
  let startTime = dayStart(new Date());
  startTime = addHour(startTime, here.hour);
  startTime = addMinute(startTime, here.minute);

  let endTime = dayStart(new Date());
  endTime = addHour(endTime, leaving.hour);
  endTime = addMinute(endTime, leaving.minute);

  const diffInMilliseconds = endTime.valueOf() - startTime.valueOf();

  let result = dayStart(new Date());
  result = addHour(result, Math.floor(diffInMilliseconds / 3600000));
  result = addMinute(result, Math.floor((diffInMilliseconds % 3600000) / 6000));
  return result;
};
