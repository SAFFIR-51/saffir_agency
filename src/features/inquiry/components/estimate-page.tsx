import { SubpageSection } from "@/shared/sections";
import { estimateContent as c } from "../model/content";
import { EstimateForm } from "./estimate-form";

export function EstimatePage() {
  return (
    <div className="mx-auto w-full max-w-4xl bg-white pb-28 text-black lg:pb-40">
      <h1 className="sr-only">{c.title}</h1>
      <SubpageSection id="estimate-title" first en="Estimate" sub={c.sub}>
        <div className="border-t border-black pt-8 lg:pt-10">
          <EstimateForm />
        </div>
      </SubpageSection>
    </div>
  );
}
