export class StatusResponseDto {
  constructor(
    public id: number,
    public status: number,
    public message: string,
  ) {}
}
