"use client";
import BreakForm from "@/components/BreakForm";
import HereForm from "@/components/HereForm";
import LeavingForm from "@/components/LeavingForm";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";

function FormStack() {
  const step = useStateStore((store) => store.step);
  return (
    <div className="md:3/5 sm:full relative m-auto my-5 h-fit max-h-114 lg:w-2/5">
      <HereForm />
      {(() => {
        if (step === Steps.BREAKS || step === Steps.LEAVING) {
          return <BreakForm />;
        }
      })()}
      {step === Steps.LEAVING && <LeavingForm />}
    </div>
  );
}

export default FormStack;
