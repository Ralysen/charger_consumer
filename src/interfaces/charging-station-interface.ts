export class ChargingStationType {
  constructor(
    public id?: string,
    public name?: string,
    public plug_count?: number,
    public efficiency?: number,
    public current_type?: string,
  ) {}
}
