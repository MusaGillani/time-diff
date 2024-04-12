"use client";
import BreakForm from "@/components/BreakForm";
import HereForm from "@/components/HereForm";
import LeavingForm from "@/components/LeavingForm";
import { useStateStore } from "@/state/provider";
import { FormTypes } from "@/state/store";

function FormStack() {
  const form = useStateStore((store) => store.form);
  return (
    <div className="relative m-auto my-5 h-fit max-h-114 w-2/5">
      <HereForm />
      {(() => {
        if (form === FormTypes.BREAKS || form === FormTypes.LEAVING) {
          return <BreakForm />;
        }
      })()}
      {form === FormTypes.LEAVING && <LeavingForm />}
    </div>
  );
}

export default FormStack;
