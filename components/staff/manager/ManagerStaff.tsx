"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HotelStaff, IStaffStats } from "@/types/staff";
import { staffService } from "@/services/staft.service";
import StaffFilter from "@/components/staff/filter/StaffFilter";
import QuickStatusFilter, {
  StaffStatusFilter,
} from "@/components/staff/filter/QuickStatusFilter";
import StaffToolbar from "@/components/staff/actions/StaffToolbar";
import StaffTable from "@/components/staff/table/StaffTable";
import StaffDetailDrawer from "@/components/staff/detail/StaffDetailDrawer";
import CreateStaffDialog from "@/components/staff/dialog/CreateStaffDialog";
import { Position } from "@/types/position";
import { positionService } from "@/services/position.service";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import toast from "react-hot-toast";
import StaffStats from "@/components/staff/dashboard/StaffStats";
import EditStaffDialog from "@/components/staff/dialog/EditStaffDialog";
import { useImportFile } from "@/hooks/useImportStaff";
import ImportStaffDialog from "@/components/staff/import/ImportStaffDialog";
import ImportErrorDialog from "@/components/staff/import/ImportErrorDialog";
import { useStaffStats } from "@/hooks/useStaffStats";
export default function ManagerStaff() {
  const [loadingEmployess, setLoadingEmployees] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [editingStaff, setEditingStaff] = useState<HotelStaff | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<HotelStaff[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [position, setPosition] = useState(0);
  const [workDate, setWorkDate] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<HotelStaff | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const importer = useImportFile({
    importFn: staffService.importStaff,
    onSuccess: () => fetchEmployees(page, pageSize),
  });
  const { staffStats, loading, refetch } = useStaffStats();
  const fetchEmployees = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoadingEmployees(true);

      const res = await staffService.getEmployee({
        page: currentPage,
        pageSize: currentPageSize,
        search: search,
        positionId: position === 0 ? undefined : position,
      });

      const data = res.data.data;

      setEmployees(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await positionService.getAll();

      setPositions(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [page, pageSize, search, position]);

  const handleOnSubmitCreateStaff = async (data: any) => {
    try {
      const res = await staffService.createStaff(data);
      console.log(res.data);
      setOpenCreate(false);
      fetchEmployees();
      toast.success("Thêm nhân viên thành công");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi thêm nhân viên");
    }
  };
  const handleOnSubmitUpdateStaff = async (data: any) => {
    if (!editingStaff) return;
    try {
      const res = await staffService.updateStaff(editingStaff.id, data);
      console.log(res.data);
      setOpenEdit(false);
      fetchEmployees();
      toast.success("Cập nhật nhân viên thành công");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi cập nhật nhân viên");
    }
  };
  return (
    <div
      className="
        space-y-6

        bg-[#F2F2F7]

        p-6

        dark:bg-black
      "
    >
      {/* Header */}

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#007AFF]">
          Quản lý nhân sự
        </p>

        <h1 className="mt-1 text-3xl font-black">Danh sách nhân viên</h1>
      </div>

      {/* Statistics */}

      <StaffStats data={staffStats} />

      {/* Filter */}

      <StaffFilter
        search={search}
        onSearchChange={setSearch}
        position={position}
        positions={positions}
        onPositionChange={setPosition}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        workDate={workDate}
        onWorkDateChange={setWorkDate}
      />

      {/* Quick Filter */}

      {/* <QuickStatusFilter positions={positions} value={status} onChange={setStatus} /> */}

      {/* Toolbar */}
      <>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept=".xlsx,.xls"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              importer.startImport(file);
            }

            e.target.value = "";
          }}
        />
        <StaffToolbar
          selectedCount={0}
          onCreate={() => {
            setOpenCreate(true);
          }}
          onAssignShift={() => {
            console.log("Assign");
          }}
          onExport={() => {
            console.log("Export");
          }}
          onImport={() => fileInputRef.current?.click()}
        />
        {/* <ImportStaffDialog
          open={importer.open}
          onOpenChange={importer.setOpen}
          setErrorDialogOpen={importer.setErrorDialogOpen}
          progress={importer.progress}
          steps={importer.steps}
          fileName={importer.fileName}
          errorMessage={importer.errorMessage}
        /> */}
        <ImportErrorDialog
          open={importer.errorDialogOpen}
          onOpenChange={importer.setErrorDialogOpen}
          totalRows={importer.totalRows}
          errors={importer.importErrors}
        />
      </>

      {/* Table */}

      <StaffTable
        records={employees}
        loading={loading}
        onView={(staff) => {
          setSelectedStaff(staff);
          setOpenDrawer(true);
        }}
        onEdit={(staff) => {
          setEditingStaff(staff);
          setOpenEdit(true);
        }}
        onDelete={(staff) => {
          console.log("Delete", staff);
        }}
      />
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
      {/* Drawer */}

      <StaffDetailDrawer
        open={openDrawer}
        staff={selectedStaff}
        onClose={() => setOpenDrawer(false)}
        onEdit={() => {
          console.log(selectedStaff);
        }}
      />
      <CreateStaffDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        positions={positions}
        onSubmit={(data) => {
          handleOnSubmitCreateStaff(data);
        }}
      />
      <EditStaffDialog
        open={openEdit}
        staff={editingStaff}
        positions={positions}
        onClose={() => setOpenEdit(false)}
        onSubmit={(data) => {
          handleOnSubmitUpdateStaff(data);
        }}
      />
    </div>
  );
}
