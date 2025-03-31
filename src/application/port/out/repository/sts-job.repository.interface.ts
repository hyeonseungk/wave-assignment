import {
  StsJob,
  StsJobCreateInput,
} from '../../../../domain/entity/sts-job.entity';
import { Id } from '../../../../domain/entity/type';

export interface StsJobRepository {
  createOne(input: StsJobCreateInput): Promise<void>;
  findOneById(id: Id): Promise<StsJob | null>;
}
