import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicles: VehicleDTO[] = [];
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<VehicleDTO[]>('/api/vehicles');
  }

  getOne(id: number) {
    return this.http.get<VehicleDTO>('/api/vehicles/' + id);
  }

  create(vehicle: VehicleDTO) {
    return this.http.post<VehicleDTO>('/api/vehicles', vehicle);
  }

  update(vehicle: VehicleDTO) {
    return this.http.put<VehicleDTO>('/api/vehicles', vehicle);
  }

  delete(id: number) {
    return this.http.delete('/api/vehicles/' + id);
  }



  async loadVehiclesIfEmpty() {
    if (!this.vehicles || this.vehicles.length === 0) {
      const vehicles = await new Promise<VehicleDTO[]>((resolve, reject) => {
        this.getAll().subscribe({
          next: (vehicles) => {
            resolve(vehicles);
          },
          error: (err) => {
            reject(err);
          }
        });
      });

      this.vehicles = vehicles;
    }
  }

  async filterVehicles(query: string) {
    try {
      await this.loadVehiclesIfEmpty();
      return this.vehicles.filter(vehicle => {
        const searchTerm = query.toLowerCase();
        return (
          (vehicle.brand && vehicle.brand.toLowerCase().includes(searchTerm)) ||
          (vehicle.model && vehicle.model.toLowerCase().includes(searchTerm)) ||
          (vehicle.basePrice && vehicle.basePrice.toString().toLowerCase().includes(searchTerm)) ||
          (vehicle.kmCost && vehicle.kmCost.toString().toLowerCase().includes(searchTerm)) ||
          (vehicle.status && vehicle.status.toLowerCase().includes(searchTerm))
        );
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  
}
