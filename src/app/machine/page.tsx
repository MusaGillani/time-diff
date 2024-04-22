import { Steps } from "@/state-machine/machine";
import { MachineProvider } from "@/state-machine/provider";
import { Stepper } from "@/components/Stepper";
import { defaultContext } from "@/state-machine/context";

export default function Page() {
  return (
    <main className="h-screen.w-screen">
      <MachineProvider
        initialState={Steps.HERE}
        initialContext={defaultContext}
      >
        <Stepper />
      </MachineProvider>
    </main>
  );
}
