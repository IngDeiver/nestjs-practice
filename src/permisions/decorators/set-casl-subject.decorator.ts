import { SetMetadata, Type } from '@nestjs/common';

export const SUBJECT_TYPE_KEY = "SUBJECT_TYPE"
export const SetCaslSubject = (subjectType: Type) => SetMetadata(SUBJECT_TYPE_KEY, subjectType);
