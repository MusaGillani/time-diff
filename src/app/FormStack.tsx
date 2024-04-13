"use client";
import BreakForm from "@/components/BreakForm";
import HereForm from "@/components/HereForm";
import LeavingForm from "@/components/LeavingForm";
import Result from "@/components/Result";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";

function FormStack() {
  const step = useStateStore((store) => store.step);
  return (
    <div className="sm:full relative m-auto my-5 h-fit max-h-114 md:w-3/5 lg:w-2/5">
      <HereForm />
      {step !== Steps.HERE && <BreakForm />}
      {(step === Steps.LEAVING || step === Steps.RESULT) && <LeavingForm />}
      {step === Steps.RESULT && <Result />}
    </div>
  );
}

export default FormStack;
