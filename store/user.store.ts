// store/user.store.ts
import { create } from 'zustand';

// Định nghĩa Enum tương ứng với Backend C# của bạn
export enum Role {
    Customer = 1,
    Staff = 2,
    Manager = 3,
    Admin = 4
}

export interface UserEntity {
    id: number;
    fullName: string;
    email: string;
    codeId: string;
    verified: boolean;
    phone?: string | null;
    avatar?: string | null;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

interface UserState {
    users: UserEntity[];
    loading: boolean;
    error: string | null;

    // Nghiệp vụ CRUD
    fetchUsers: () => Promise<void>;
    createUser: (user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateUser: (id: number, data: Partial<Omit<UserEntity, 'id' | 'createdAt'>>) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;

    // Các hàm hỗ trợ nhanh
    toggleUserStatus: (id: number) => Promise<void>; // Khóa / Mở khóa tài khoản nhanh
    getUserById: (id: number) => UserEntity | undefined;
}

// Dữ liệu giả lập ban đầu hỗ trợ chạy offline mượt mà
const mockUsers: UserEntity[] = [
    {
        id: 1,
        fullName: "Trần Hữu",
        email: "truonghuu.170804@gmail.com",
        codeId: "US-8891",
        verified: true,
        phone: "0912345678",
        avatar: null,
        role: Role.Admin,
        isActive: true,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        fullName: "Nguyễn Kiều Trang",
        email: "kieutrang.frontoffice@hotel.com",
        codeId: "US-1102",
        verified: true,
        phone: "0987654321",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: Role.Staff,
        isActive: true,
        createdAt: new Date().toISOString()
    }
];

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    error: null,

    // 1. Lấy danh sách thành viên (READ)
    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            // Khi tích hợp API thực tế, bạn chỉ cần mở dòng dưới đây:
            // const res = await userService.getAll();
            // set({ users: res.data, loading: false });

            // Tạm thời giả lập dữ liệu:
            await new Promise((resolve) => setTimeout(resolve, 500));
            set({ users: mockUsers, loading: false });
        } catch (err: any) {
            set({ error: err.message || "Không thể tải danh sách người dùng", loading: false });
        }
    },

    // 2. Tạo tài khoản mới (CREATE)
    createUser: async (userData) => {
        set({ loading: true, error: null });
        try {
            // API call: await userService.create(userData);

            const newUser: UserEntity = {
                ...userData,
                id: Math.max(...get().users.map(u => u.id), 0) + 1,
                createdAt: new Date().toISOString()
            };

            set((state) => ({
                users: [newUser, ...state.users],
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || "Tạo tài khoản thất bại", loading: false });
            throw err;
        }
    },

    // 3. Cập nhật thông tin (UPDATE)
    updateUser: async (id, data) => {
        set({ loading: true, error: null });
        try {
            // API call: await userService.update(id, data);

            set((state) => ({
                users: state.users.map((u) =>
                    u.id === id
                        ? { ...u, ...data, updatedAt: new Date().toISOString() }
                        : u
                ),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || "Cập nhật tài khoản thất bại", loading: false });
            throw err;
        }
    },

    // 4. Xóa tài khoản (DELETE)
    deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
            // API call: await userService.delete(id);

            set((state) => ({
                users: state.users.filter((u) => u.id !== id),
                loading: false
            }));
        } catch (err: any) {
            set({ error: err.message || "Xóa tài khoản thất bại", loading: false });
            throw err;
        }
    },

    // 5. Khóa / Mở khóa tài khoản nhanh (Toggle IsActive)
    toggleUserStatus: async (id) => {
        const user = get().users.find(u => u.id === id);
        if (user) {
            await get().updateUser(id, { isActive: !user.isActive });
        }
    },

    // 6. Tìm kiếm thông tin theo ID nhanh trên client
    getUserById: (id) => {
        return get().users.find((u) => u.id === id);
    }
}));