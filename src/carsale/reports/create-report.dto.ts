
import { IsString, IsNumber, IsDate, Min, Max, IsLatitude, IsLongitude } from 'class-validator';

export class CreateReportDto {

  @IsNumber()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsDate()
  @Min(2000)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  mileage: number;


}