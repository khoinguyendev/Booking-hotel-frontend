// app/main/hotels/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, Star, ArrowRight, Heart, Search, 
  SlidersHorizontal, Building2, Sparkles, X,
  ArrowUpDown, CheckCircle2, DollarSign
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Danh sách dữ liệu chuỗi chi nhánh thực tế tích hợp đầy đủ các tiêu chí lọc
const BRAND_BRANCHES = [
  {
    id: 1,
    name: 'Grand Apple Premium Hotel - Vũng Tàu Branch',
    city: 'Vũng Tàu',
    address: '02 Thùy Vân, Phường Thắng Tam, TP. Vũng Tàu',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    star: 5,
    ratingScore: 9.6,
    reviewsCount: 1420,
    basePrice: 2450000,
    badge: 'View biển trực diện',
    amenities: ['wifi', 'pool', 'spa', 'gym']
  },
  {
    id: 2,
    name: 'Grand Apple Heritage Boutique - Đà Lạt Branch',
    city: 'Đà Lạt',
    address: '12 Trần Phú, Phường 3, TP. Đà Lạt',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    star: 4,
    ratingScore: 9.4,
    reviewsCount: 986,
    basePrice: 1850000,
    badge: 'Phong cách Đông Dương',
    amenities: ['wifi', 'restaurant', 'spa']
  },
  {
    id: 3,
    name: 'Grand Apple Oasis Resort - Phú Quốc Branch',
    city: 'Phú Quốc',
    address: 'Bãi Trường, Dương Tơ, Đảo Phú Quốc',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    star: 5,
    ratingScore: 9.8,
    reviewsCount: 2150,
    basePrice: 3600000,
    badge: 'Hồ bơi vô cực sát biển',
    amenities: ['wifi', 'pool', 'restaurant', 'gym', 'spa']
  }
];

const AVAILABLE_AMENITIES = [
  { id: 'wifi', label: 'Wifi miễn phí' },
  { id: 'pool', label: 'Bể bơi vô cực' },
  { id: 'gym', label: 'Phòng Gym' },
  { id: 'restaurant', label: 'Nhà hàng & Buffet' },
  { id: 'spa', label: 'Spa & Massage' },
];

export default function CustomerHotelListPage() {
  const [mounted, setMounted] = useState(false);
  
  // States cho các bộ lọc linh hoạt
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Tất cả');
  const [maxPrice, setMaxPrice] = useState(4000000);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      toast.success('Đã xóa khỏi danh sách yêu thích.');
    } else {
      setWishlist([...wishlist, id]);
      toast.success('Đã lưu vào mục yêu thích!');
    }
  };

  const handleToggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('Tất cả');
    setMaxPrice(4000000);
    setSelectedStar(null);
    setSelectedAmenities([]);
    setSortBy('default');
    toast.success('Đã đặt lại toàn bộ bộ lọc.');
  };

  // Logic lọc và sắp xếp nâng cao (dùng sử dụng useMemo để tối ưu hóa hiệu năng)
  const processedBranches = useMemo(() => {
    let result = [...BRAND_BRANCHES];

    // 1. Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => b.name.toLowerCase().includes(query) || b.address.toLowerCase().includes(query));
    }

    // 2. Lọc theo Thành phố
    if (selectedCity !== 'Tất cả') {
      result = result.filter(b => b.city === selectedCity);
    }

    // 3. Lọc theo Khoảng giá tối đa
    result = result.filter(b => b.basePrice <= maxPrice);

    // 4. Lọc theo Số sao khách sạn
    if (selectedStar !== null) {
      result = result.filter(b => b.star === selectedStar);
    }

    // 5. Lọc theo Tiện ích đi kèm (Phải chứa tất cả tiện ích được chọn)
    if (selectedAmenities.length > 0) {
      result = result.filter(b => selectedAmenities.every(amenity => b.amenities.includes(amenity)));
    }

    // 6. Sắp xếp chuỗi dữ liệu đầu ra
    if (sortBy === 'priceAsc') result.sort((a, b) => a.basePrice - b.basePrice);
    if (sortBy === 'priceDesc') result.sort((a, b) => b.basePrice - a.basePrice);
    if (sortBy === 'ratingDesc') result.sort((a, b) => b.ratingScore - a.ratingScore);

    return result;
  }, [searchQuery, selectedCity, maxPrice, selectedStar, selectedAmenities, sortBy]);

  if (!mounted) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500 text-[#1C1C1E] dark:text-white">
      
      {/* 1. HEADER TIÊU ĐỀ CHÍNH CHUỖI THƯƠNG HIỆU */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#E5E5EA] dark:border-[#2C2C2E] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[10px] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Grand Apple Hotels Chain</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Khám phá Chi nhánh</h1>
          <p className="text-xs text-[#8E8E93]">Tìm kiếm phòng trống linh hoạt trên toàn hệ thống chi nhánh cao cấp.</p>
        </div>
      </div>

      {/* 2. THANH CHỨC NĂNG TÌM KIẾM & PHÂN LOẠI NHANH */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Ô Search chính */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-[#8E8E93]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bạn muốn nghỉ dưỡng ở đâu? (Vũng Tàu, Đà Lạt...)"
            className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-2xl bg-[#F2F2F7] dark:bg-[#000000]/40 text-[#1C1C1E] dark:text-white focus:outline-none placeholder-[#8E8E93] transition-all"
          />
        </div>

        {/* Cụm chức năng Sắp xếp & Mở Bộ lọc Nâng cao */}
        <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          {/* Sắp xếp e-commerce */}
          <div className="flex items-center space-x-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] px-3 py-2 rounded-2xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8E8E93]" />
            <select 
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer text-[#1C1C1E] dark:text-white"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="priceAsc">Giá: Thấp đến Cao</option>
              <option value="priceDesc">Giá: Cao đến Thấp</option>
              <option value="ratingDesc">Đánh giá: Cao nhất</option>
            </select>
          </div>

          {/* Nút mở bộ lọc bổ sung trên Mobile/Desktop */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              showMobileFilters || selectedStar || selectedAmenities.length > 0
                ? 'bg-[#007AFF] text-white' 
                : 'bg-[#F2F2F7] dark:bg-[#2C2C2E] text-[#8E8E93] hover:text-current'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Bộ lọc nâng cao</span>
          </button>
        </div>
      </div>

      {/* 3. BẢNG ĐIỀU KHIỂN BỘ LỌC NÂNG CAO (Advanced Filter Dashboard Component) */}
      {(showMobileFilters || selectedStar || selectedAmenities.length > 0 || maxPrice < 4000000) && (
        <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-6 shadow-sm space-y-6 animate-in slide-in-from-top-3 duration-300">
          <div className="flex justify-between items-center border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#007AFF]" /> Tùy chọn lọc chuyên sâu
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-[#FF3B30] hover:underline"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lọc khoảng giá */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider flex justify-between">
                <span>Ngân sách tối đa / đêm</span>
                <span className="text-[#007AFF] font-mono font-bold text-xs">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(maxPrice)}
                </span>
              </label>
              <input 
                type="range"
                min={1500000}
                max={4000000}
                step={100000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
              />
              <div className="flex justify-between text-[10px] text-[#8E8E93] font-mono">
                <span>1.5M</span>
                <span>4.0M+</span>
              </div>
            </div>

            {/* Lọc số lượng sao */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Tiêu chuẩn xếp hạng</label>
              <div className="flex gap-2">
                {[3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedStar(selectedStar === star ? null : star)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border flex items-center justify-center space-x-1 transition-all ${
                      selectedStar === star 
                        ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF]' 
                        : 'border-[#E5E5EA] dark:border-[#2C2C2E] text-[#8E8E93] hover:text-current'
                    }`}
                  >
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc Tiện ích tích hợp */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Tiện ích đặc quyền tích hợp</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      onClick={() => handleToggleAmenity(amenity.id)}
                      className={`px-3 py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                        isChecked 
                          ? 'bg-[#34C759]/10 border-[#34C759] text-[#34C759]' 
                          : 'border-[#E5E5EA] dark:border-[#2C2C2E] text-[#8E8E93] hover:text-current'
                      }`}
                    >
                      {amenity.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tỉnh thành chọn nhanh điều hướng */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['Tất cả', 'Vũng Tàu', 'Đà Lạt', 'Phú Quốc'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCity === city 
                ? 'bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E]' 
                : 'bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] text-[#8E8E93]'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 4. GRID DANH SÁCH CHI NHÁNH KHI ĐÃ QUA BỘ LỌC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedBranches.map((branch) => {
          const isLiked = wishlist.includes(branch.id);
          const formatMoney = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

          return (
            <Link 
              key={branch.id} 
              href={`/main/hotels/${branch.id}`}
              className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img 
                  src={branch.image} 
                  alt={branch.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                  {branch.badge}
                </span>

                <button 
                  onClick={(e) => handleToggleWishlist(branch.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md rounded-full text-[#8E8E93] hover:text-[#FF3B30] transition-colors active:scale-90 shadow-sm z-10"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF3B30] text-[#FF3B30]' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <div className="flex items-center space-x-1 text-[#FFCC00]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[#1C1C1E] dark:text-white text-xs">{branch.star} Sao</span>
                      <span className="text-[#8E8E93] font-medium">({branch.ratingScore} điểm)</span>
                    </div>
                    <span className="text-[#8E8E93] flex items-center bg-[#F2F2F7] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-md">
                      <MapPin className="w-3 h-3 mr-0.5 text-[#30B0C7]" />
                      {branch.city}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-current group-hover:text-[#007AFF] transition-colors line-clamp-2 leading-tight">
                    {branch.name}
                  </h3>

                  <p className="text-xs text-[#8E8E93] line-clamp-1">
                    {branch.address}
                  </p>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                  <div>
                    <p className="text-[9px] text-[#8E8E93] uppercase font-bold tracking-wider">Giá thành viên chuỗi từ</p>
                    <p className="text-base font-black text-[#007AFF] font-mono">
                      {formatMoney(branch.basePrice)}
                      <span className="text-[10px] text-[#8E8E93] font-semibold font-sans"> /đêm</span>
                    </p>
                  </div>

                  <div className="px-4 py-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] group-hover:bg-[#007AFF] group-hover:text-white text-xs text-current font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1">
                    <span>Xem phòng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Thông báo rỗng khi bộ lọc quá sâu */}
      {processedBranches.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] flex flex-col items-center justify-center space-y-2">
          <p className="text-xs text-[#8E8E93] font-semibold">Không tìm thấy chi nhánh nào thỏa mãn toàn bộ tiêu chí lọc của bạn.</p>
          <button 
            onClick={handleResetFilters}
            className="text-xs font-bold text-[#007AFF] hover:underline"
          >
            Đặt lại bộ lọc để tìm kiếm tiếp
          </button>
        </div>
      )}

    </div>
  );
}