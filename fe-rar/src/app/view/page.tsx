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
import { Spinner } from "@/components/ui/spinner";
import { API_PATHS } from "@/utils/apiPaths";

const page = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(`${API_PATHS.GET}`, fetcher);

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
              {(error || isLoading) && (
                <Card>
                  <CardContent>
                    {error && (
                      <div className="flex items-center gap-4 justify-center py-10">
                        Error loading data
                      </div>
                    )}
                    {isLoading && (
                      <div className="flex items-center gap-4 justify-center py-10">
                        <Spinner className="size-10" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              {data && <TableWrapper tableData={data?.data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
