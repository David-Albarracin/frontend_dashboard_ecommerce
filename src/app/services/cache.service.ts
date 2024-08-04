import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  localStore:any;

  URL = environment.URL

  cache:any;

  menu = [
    {
      title: "Gestionar Productos",
      icon: "home",
      url: "productos",
      endPoint: "product"
    },
    {
      title: "Gestionar Clientes",
      icon: "people",
      url: "clientes",
      endPoint: "customer"
    },
    {
      title: "Gestionar Pedidos",
      icon: "category",
      url: "pedidos",
      endPoint: "order"
    },
    {
      title: "Gestionar Pagos",
      icon: "payment",
      url: "pagos",
      endPoint: "payment"
    },
    {
      title: "Gestionar Empleados",
      icon: "camera_front",
      url: "empleados",
      endPoint: "employee"
    },
    {
      title: "Gestionar Oficinas",
      icon: "domain",
      url: "oficinas",
      endPoint: "office"
    }
  ];

  
  constructor(
    private http: HttpClient, 
  ) {}

  httpGetList = (urlName: string) => {
    return this.http.get<[]>(`${this.URL}/${this.findEndPoint(urlName)}`)
  }

  httpGetById = (urlName: string, id:string) => {
    return this.http.get<{}>(`${this.URL}/${this.findEndPoint(urlName)}/${id}`)
  }

  httpDeleteById = (urlName: string, id:string) => {
    return this.http.delete<{}>(`${this.URL}/${this.findEndPoint(urlName)}/${id}`)
  }


  findEndPoint(urlName: string): string | undefined {
    const menuItem = this.menu.find(menu => menu.url === urlName);
    return menuItem ? menuItem.endPoint : undefined;
  }
  


}
