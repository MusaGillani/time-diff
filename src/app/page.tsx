import { Label } from "@/components/ui/label";
import { Stack } from "./Stack";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Label className="mx-auto my-2 text-center text-2xl font-semibold ">
        Time Diff{" "}
      </Label>
      <Stack />
    </main>
  );
}
