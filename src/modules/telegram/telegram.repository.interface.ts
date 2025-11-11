export interface ITelegramRepository {
  acceptRepository: (data: any) => Promise<{success: boolean; message?: string }>;
  mainRepository: (data: any) => Promise<{success: boolean; message?: string }>;
  expertsRepository: (data: any) => Promise<{success: boolean; message?: string }>;
  consultationRepository: (data: any) => Promise<{success: boolean; message?: string }>;
  detailsCarRepository: (data: any) => Promise<{success: boolean; message?: string }>;
  consultationCarRepository: (data: any) => Promise<{success: boolean; message?: string }>;
}
