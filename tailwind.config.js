
module.exports = {
  darkMode: 'class', // BẮT BUỘC: Kích hoạt điều khiển theme qua class danh định
  theme: {
    extend: {
      colors: {
        neuro: {
          bg: '#0B0F19',       // Nền đen sâu huyền bí của NeuroBank
          card: '#161C2A',     // Nền card xám xanh đậm 
          border: '#232D42',   // Đường viền mờ tinh tế
          purple: '#7C3AED',   // Tím Electric chủ đạo (Active state)
          cyan: '#06B6D4',     // Xanh ngọc neon nhấn các chỉ số tăng trưởng
          textMuted: '#94A3B8' // Chữ phụ xám nhạt mịn
        }
      }
    }
  },
  plugins: [],
}
