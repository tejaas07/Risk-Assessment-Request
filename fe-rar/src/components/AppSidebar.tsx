"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { VscEye } from "react-icons/vsc";

import Logo from "../../public/Logo.svg";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-[#fff] rounded-[12] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center ">
                <Logo />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">DSS GmbH</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span>Services</span>
            </div>
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
              }}
            >
              <SidebarMenuButton
                asChild
                isActive={pathname == "/view" ? true : false}
              >
                <a href={"/view"} className="flex gap-2">
                  <VscEye size={16} />
                  <span>View Requests</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton
                asChild
                isActive={pathname == "/" ? true : false}
              >
                <a href={"/"} className="flex gap-2">
                  <div>
                    <Plus size={16} />
                  </div>
                  <span>Add Requests</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
