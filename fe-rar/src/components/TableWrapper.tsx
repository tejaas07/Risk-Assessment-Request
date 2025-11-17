import React from "react";
import Container from "@mui/material/Container";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableWrapperProps = {
  tableData: FormData[];
};

const TableWrapper = ({ tableData }: TableWrapperProps) => {
  console.log(tableData);

  return (
    <>
      <div className="">
        <Table className="bg-[#080808] overflow-hidden border rounded-lg">
          <TableHeader className="sticky top-0 z-10 bg-[#262626] border rounded-lg">
            <TableRow>
              <TableHead className="text-center">Sr. No.</TableHead>
              <TableHead className="text-center">Company Name</TableHead>
              <TableHead className="text-center">Contact Person</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Job Site Location</TableHead>
              <TableHead className="text-center">Type of activity</TableHead>
              <TableHead className="text-center">Specific hazards</TableHead>
              <TableHead className="text-center">Preferred Timeframe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {tableData.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {i + 1}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.company}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.contact}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.email}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.location}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.activity}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.hazards}
                </TableCell>
                <TableCell className="whitespace-normal break-words font-medium h-24 text-center">
                  {item?.timeframe}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default TableWrapper;
