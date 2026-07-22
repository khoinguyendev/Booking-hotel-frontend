"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, FilePlus2 } from "lucide-react";
import { mockRequests } from "@/data/mockRequests";
import { RequestStatus, RequestType, StaffRequest } from "@/types/requests";
import StatisticCards from "@/components/requests/StatisticCards";
import RequestFilter from "@/components/requests/RequestFilter";
import TimelineGroup from "@/components/requests/TimelineGroup";
import RequestDetailSheet from "@/components/requests/RequestDetailSheet";
import CreateRequestDialog from "@/components/requests/CreateRequestDialog";
import { requestService } from "@/services/request.service";

export default function StaffRequestsPage() {
  const [data,setData] = useState<StaffRequest[] >([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selected, setSelected] = useState<StaffRequest | null>(null);

  const [search, setSearch] = useState("");

  const [type, setType] = useState<RequestType | "All">("All");

  const [status, setStatus] = useState<RequestStatus | "All">("All");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestService.getEmployeeRequests();
        setData(response.data.data);
      }
      catch (error) {
        console.error("Error fetching employee requests:", error);
      }
    };

    fetchData();
  }, []);
  // const filteredRequests = useMemo(() => {
  //   return data?.filter((item) => {
  //     const keyword = search.toLowerCase();

  //     const matchSearch =
  //       item.employeeName.toLowerCase().includes(keyword) ||
  //       item.employeeCode.toLowerCase().includes(keyword);

  //     const matchType = type === "All" || item.type === type;

  //     const matchStatus = status === "All" || item.status === status;

  //     return matchSearch && matchType && matchStatus;
  //   });
  // }, [data, search, type, status]);

  return (
    <div
      className="
        min-h-full
        space-y-6
        bg-[#F2F2F7]
        p-6
        text-[#1C1C1E]

        dark:bg-black
        dark:text-white
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#007AFF]
            "
          >
            HOTEL STAFF
          </span>

          <h1 className="mt-2 text-4xl font-black tracking-tight">Đơn từ</h1>

          <p className="mt-2 text-sm text-gray-500">
            Quản lý đơn xin nghỉ, đổi ca và tăng ca.
          </p>
        </div>
        <CreateRequestDialog
          open={openCreateDialog}
          onOpenChange={setOpenCreateDialog}
        />
       <button
          onClick={() => {
          setOpenCreateDialog(true);
        }}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#007AFF]
            px-5
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-[#0066DD]
          "
        >
          <FilePlus2 size={18} />
          Tạo đơn
        </button>
      </div>

      {/* Statistic */}

      <StatisticCards requests={data} />

      {/* Filter */}

      {/* <RequestFilter
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        status={status}
        onStatusChange={setStatus}
        onCreate={() => {
          setOpenCreateDialog(true);
        }}
      /> */}

      {/* Timeline */}

      {data?.length > 0 ? (
        <TimelineGroup requests={data} onSelect={setSelected} />
      ) : (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-[#D1D1D6]
            bg-white
            py-24

            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
        >
          <ClipboardList size={42} className="text-gray-400" />

          <h3 className="mt-4 text-lg font-bold">Không có đơn phù hợp</h3>

          <p className="mt-2 text-sm text-gray-500">
            Hãy thay đổi bộ lọc hoặc tạo đơn mới.
          </p>
        </div>
      )}

      {/* Detail */}

      <RequestDetailSheet
        open={selected !== null}
        request={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
