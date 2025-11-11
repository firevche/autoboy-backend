
export interface ITelegramService {
  acceptService: (data: any) => Promise<{success: boolean; message?: string }>;
  mainService: (data: any) => Promise<{success: boolean; message?: string }>;
  expertsService: (data: any) => Promise<{success: boolean; message?: string }>;
  consultationService: (data: any) => Promise<{success: boolean; message?: string }>;
  detailsCarService: (data: any) => Promise<{success: boolean; message?: string }>;
  consultationCarService: (data: any) => Promise<{success: boolean; message?: string }>;
}
