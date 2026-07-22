// components/attendance/AttendanceTable.tsx
import React from 'react';
import { AttendanceRecord } from '@/services/attendance.service';
import { useRouter } from 'next/navigation';
import { HotelStaff } from '@/types/staff';
import { useAuthStore } from '@/store/auth.store';
interface AttendanceTableProps {
  records: HotelStaff[];
}

export const AttendanceTable = ({ records }: AttendanceTableProps) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const handleRowClick = (employeeId: string) => {
    //router.push('/quan-ly/cham-cong/phan-ca');
    
    // Mẹo nhỏ: Nếu sau này bạn muốn lọc thẳng ca của riêng nhân viên đó, bạn có thể truyền thêm query parameter:
    router.push(`/quan-ly/cham-cong/phan-ca?employeeId=${employeeId}`);
  };
  console.log('user', records); // ✅ Kiểm tra thông tin người dùng
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors">
              <th className="p-4 pl-6">Mã nhân sự</th>
              <th className="p-4">Họ và tên</th>
              <th className="p-4">Bộ phận</th>
              <th className="p-4 text-center">Check-in</th>
              <th className="p-4 text-center">Check-out</th>
              <th className="p-4 pr-6 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/50 text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors">
            {records.map((row) => (
              row.userId !== user?.id && (
              <tr key={row.id} onClick={() => handleRowClick(row.employeeCode)} className="hover:bg-[#F2F2F7]/50 dark:hover:bg-[#2C2C2E]/40 transition-colors duration-200">
                <td className="p-4 pl-6 font-mono text-xs text-[#8E8E93]">{row.employeeCode}</td>
                <td className="p-4 font-semibold text-current">{row.fullName}</td>
                <td className="p-4 text-xs text-[#8E8E93]">{row.position}</td>
                <td className="p-4 text-center font-mono text-xs">{row.workSchedule?.attendance?.checkInTime}</td>
                <td className="p-4 text-center font-mono text-xs">{row.workSchedule?.attendance?.checkOutTime}</td>
                <td className="p-4 pr-6 text-right">
                  <span className="inline-flex items-center space-x-1.5 text-xs font-medium">
                    <span className={`w-2 h-2 rounded-full ${
                      row.workSchedule?.attendance?.status == 'Ontime' ? 'bg-[#34C759]' : 
                      row.workSchedule?.attendance?.status == 'Late' ? 'bg-[#FF9500]' :   
                      'bg-[#FF3B30]'                             
                    }`} />
                    <span>
                      {row.workSchedule?.attendance?.status === 'Ontime' ? 'Đúng giờ' : row.workSchedule?.attendance?.status === 'Late' ? 'Đi muộn' : 'Vắng mặt'}
                    </span>
                  </span>
                </td>
              </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};