import BreakForm from "@/components/BreakForm";
import HereForm from "@/components/HereForm";
import LeavingForm from "@/components/LeavingForm";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="relative m-auto my-5 w-2/5 h-96">
        <HereForm />
        <BreakForm />
        <LeavingForm />
      </div>
    </main>
  );
}
