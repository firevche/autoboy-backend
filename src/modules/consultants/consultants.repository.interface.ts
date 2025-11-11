import { ConsultantsLeftModel, ConsultantsRightModel } from "@prisma/client";
import { ConsultantsDto } from "./dto/consultants-edit.dto";

export interface IConsultantsRepository {
  leftEditRepository: (id: number, dto: ConsultantsDto) => Promise<ConsultantsLeftModel | null>;
  getLeftRepository: () => Promise<ConsultantsLeftModel[]>;
  rightEditRepository: (id: number, dto: ConsultantsDto) => Promise<ConsultantsRightModel | null>;
  getRightRepository: () => Promise<ConsultantsRightModel[]>;
}
