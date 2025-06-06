import React from "react";

interface CheckoutStepProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export function CheckoutStep({ label, icon, isActive }: CheckoutStepProps) {
  return (
    <div
      className={`flex items-center ${isActive ? "text-blue-500" : "text-gray-500"}`}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2 text-sm font-medium text-nowrap">{label}</span>
      </div>
      {/* Connecting line will be handled by the parent component */}
    </div>
  );
}
