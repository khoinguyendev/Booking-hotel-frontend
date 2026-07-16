export interface DashboardStat {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: string;
}

export interface Attendance {
    month: string;
    value: number;
}

export interface Allocation {
    name: string;
    value: number;
}

export interface EventItem {
    id: number;
    title: string;
    date: string;
    location: string;
}

export interface RequestItem {
    id: number;
    title: string;
    status: "Approved" | "Pending" | "Rejected";
}