import BreakForm from "@/components/BreakForm";
import HereForm from "@/components/HereForm";
import LeavingForm from "@/components/LeavingForm";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="relative m-auto my-5 h-96 w-2/5">
        <HereForm />
        <BreakForm />
        <LeavingForm />
      </div>
    </main>
  );
}
