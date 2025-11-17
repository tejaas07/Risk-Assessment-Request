"use client";

import TableWrapper from "@/components/TableWrapper";
import Container from "@mui/material/Container";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import useSWR from "swr";
import LoadingCard from "@/components/LoadingCard";
import ErrorCard from "@/components/ErrorCard";

const page = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "http://localhost:8085/apis/get",
    fetcher
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-5">
        <header className="h-12 sticky top-0 z-50 flex border-b bg-background">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium"> View Requests</h1>
          </div>
        </header>
        <div className="px-4 lg:px-6">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-1 flex-col gap-10">
              {error && <ErrorCard />}
              {isLoading && <LoadingCard />}
              {data && <TableWrapper tableData={data?.data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
