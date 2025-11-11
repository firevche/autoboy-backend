import { ConsultantsLeftModel, ConsultantsRightModel } from "@prisma/client";
import { ConsultantsDto } from "./dto/consultants-edit.dto";

export interface IConsultantsService {
  leftEditService: (id: number, dto: ConsultantsDto) => Promise<ConsultantsLeftModel | null>;
  getLeftService: () => Promise<ConsultantsLeftModel[]>;
  rightEditService: (id: number, dto: ConsultantsDto) => Promise<ConsultantsRightModel | null>;
  getRightService: () => Promise<ConsultantsRightModel[]>;
}
