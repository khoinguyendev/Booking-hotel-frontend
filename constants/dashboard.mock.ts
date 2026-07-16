import {
    DashboardStat,
    Attendance,
    Allocation,
    EventItem,
    RequestItem,
} from "@/types/dashboard";

export const stats: DashboardStat[] = [
    {
        title: "Tổng nhân sự",
        value: "245",
        change: "+5%",
        positive: true,
        icon: "users",
    },
    {
        title: "Tỷ lệ chấm công",
        value: "95%",
        change: "+2%",
        positive: true,
        icon: "clock",
    },
    {
        title: "Hiệu suất",
        value: "89%",
        change: "+8%",
        positive: true,
        icon: "activity",
    },
    {
        title: "Nghỉ phép",
        value: "12",
        change: "-1",
        positive: false,
        icon: "calendar",
    },
];

export const attendance: Attendance[] = [
    { month: "Jan", value: 91 },
    { month: "Feb", value: 93 },
    { month: "Mar", value: 95 },
    { month: "Apr", value: 94 },
    { month: "May", value: 97 },
    { month: "Jun", value: 96 },
];

export const allocation: Allocation[] = [
    { name: "Lễ tân", value: 25 },
    { name: "Buồng", value: 35 },
    { name: "Nhà hàng", value: 20 },
    { name: "Kỹ thuật", value: 10 },
    { name: "Khác", value: 10 },
];

export const events: EventItem[] = [
    {
        id: 1,
        title: "Họp HR",
        date: "15 Jul",
        location: "Meeting Room A",
    },
    {
        id: 2,
        title: "Đào tạo nhân viên",
        date: "17 Jul",
        location: "Hall B",
    },
    {
        id: 3,
        title: "Đánh giá KPI",
        date: "20 Jul",
        location: "Room C",
    },
];

export const requests: RequestItem[] = [
    {
        id: 1,
        title: "Nghỉ phép",
        status: "Approved",
    },
    {
        id: 2,
        title: "Tăng ca",
        status: "Pending",
    },
    {
        id: 3,
        title: "Đi công tác",
        status: "Rejected",
    },
];