export class PublicLogDto {
  code: number;
  message: string;
  class: string;
  key: number;
  fields: { public_log: { entries: [] } };
}
