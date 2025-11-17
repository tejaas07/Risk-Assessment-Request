import StepForm from "@/components/StepForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-5 h-screen">
      <header className="h-12 sticky top-0 z-50 flex border-b bg-background">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium"> Add Requests</h1>
        </div>
      </header>
      <div className="px-4 lg:px-6">
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-1 flex-col gap-10">
            <StepForm />
          </div>
        </div>
      </div>
    </div>
  );
}
