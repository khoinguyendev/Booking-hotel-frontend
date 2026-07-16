// components/dashboard/AnimatedNumber.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number; // thời gian chạy hiệu ứng (ms)
  isDecimal?: boolean; // cấu hình nếu là số thập phân (như tỉ lệ % chuyên ngành)
}

export const AnimatedNumber = ({ value, duration = 1000, isDecimal = false }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Tính toán tỷ lệ phần trăm tiến trình (tối đa là 1)
      const progressRatio = Math.min(progress / duration, 1);
      
      // Hiệu ứng Ease-Out giúp số chạy chậm lại khi gần đến đích
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = easeOutQuad(progressRatio) * value;

      if (isDecimal) {
        // Giữ nguyên 1 chữ số thập phân, không làm tròn số theo yêu cầu hệ thống
        setCount(Math.round(currentCount * 10) / 10);
      } else {
        setCount(Math.floor(currentCount));
      }

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value); // Đảm bảo số cuối cùng chuẩn xác
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isDecimal]);

  return <span>{isDecimal ? count.toFixed(1) : count}</span>;
};