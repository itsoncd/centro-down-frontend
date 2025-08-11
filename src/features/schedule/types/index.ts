export interface ScheduleData {
  id: number;
  start_time: string; // "09:00:00"
  end_time: string;   // "15:00:00"
  created_at: string | null;
  updated_at: string;
}

export interface HolidayPostBody {
  date: string; // "YYYY-MM-DD"
}

export interface HTTPResponseSchedules {
  statusCode: number;
  message: string;
  data: ScheduleData[];
  timestamp: string;
}

export interface HTTPResponseHolidayPost {
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
}

export type Holiday = {
  id: number;
  date: string; // formato ISO
  created_at: string;
  updated_at: string;
};

export type HTTPResponseHolidays = {
  statusCode: number;
  message: string;
  data: Holiday[];
  timestamp: string;
};
