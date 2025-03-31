export interface Mapper<T, R> {
  mapRawToEntity(raw: T): R;
  // mapEntityToRaw(entity: R): T;
}
