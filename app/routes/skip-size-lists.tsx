import { SkipSizeListsLayout, SkipsList } from "components";
import type { Route } from "./+types/skip-size-lists";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "REMWaste code challenge" },
    {
      name: "description",
      content:
        "This is a code challenge for the REMWaste Fullstack developer role",
    },
  ];
}

export default function SkipSizeLists() {
  return (
    <SkipSizeListsLayout>
      <SkipsList />
    </SkipSizeListsLayout>
  );
}
