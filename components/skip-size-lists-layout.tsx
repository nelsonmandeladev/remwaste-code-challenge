import React, { useState } from "react";
import { cn } from "libs";
import { Sidebar, SidebarBody } from "./ui";
import { SKIPS } from "mocks";
import { SkipFilterForm } from "./skip-filter-form";
import { CheckoutStepsContainer } from "./checkout-steps-container";
import {
  IconCalendar,
  IconCreditCard,
  IconLocation,
  IconShieldCheck,
  IconTrash,
  IconTruck,
} from "@tabler/icons-react";
import { useGlobalUrlQueryParams } from "hooks";

interface SkipSizeListsLayoutProps {
  children: React.ReactNode;
}

export function SkipSizeListsLayout(props: SkipSizeListsLayoutProps) {
  const { children } = props;

  const { queryParams, setQueryParams } = useGlobalUrlQueryParams();

  const setOpen = (value: React.SetStateAction<boolean>) => {
    // Determine the new state
    const newState =
      typeof value === "function"
        ? value(queryParams.filterFormOpen) // If it's a function, call it with the current state
        : value; // Otherwise, use the value directly

    // Update the query parameters with the new state
    setQueryParams({ filterFormOpen: newState });
  };

  const stepsData = [
    { label: "Postcode", icon: <IconLocation className="h-5 w-5" /> },
    { label: "Waste Type", icon: <IconTrash className="h-5 w-5" /> },
    { label: "Select Skip", icon: <IconTruck className="h-5 w-5" /> },
    { label: "Permit Check", icon: <IconShieldCheck className="h-5 w-5" /> },
    { label: "Choose Date", icon: <IconCalendar className="h-5 w-5" /> },
    { label: "Payment", icon: <IconCreditCard className="h-5 w-5" /> },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "h-dvh",
      )}
    >
      <Sidebar
        open={queryParams.filterFormOpen}
        setOpen={setOpen}
        animate={true}
      >
        <SidebarBody className="justify-between gap-10">
          <SkipFilterForm skips={SKIPS} />
        </SidebarBody>
      </Sidebar>
      <div
        id="main-body-id"
        className="px-4 xl:px-10 py-4 w-full overflow-y-auto space-y-5 relative"
      >
        <div className="w-full flex justify-end sticky top-0 z-10">
          <CheckoutStepsContainer steps={stepsData} activeIndex={2} />
        </div>
        {children}
      </div>
    </div>
  );
}
