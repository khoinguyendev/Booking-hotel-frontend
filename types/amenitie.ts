export interface Amenitie {
  id: number;
  name: string;
  icon: string|null;
  isDeleted:boolean;
}

export interface AmenityRequest{
  name:string
   icon?: string|null;
}

export interface AddHotelAmenitiesRequest {
  AmenityIds: number[];
}