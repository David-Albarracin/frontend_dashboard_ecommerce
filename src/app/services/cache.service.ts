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
      endPoint: "products",
      inMenu: true
    },
    {
      title: "Gestionar Clientes",
      icon: "people",
      url: "clientes",
      endPoint: "customers",
      inMenu: true
    },
    {
      title: "Gestionar Pedidos",
      icon: "category",
      url: "pedidos",
      endPoint: "orders",
      inMenu: true
    },
    {
      title: "Gestionar Pagos",
      icon: "payment",
      url: "pagos",
      endPoint: "transactions",
      inMenu: true
    },
    {
      title: "Gestionar Empleados",
      icon: "camera_front",
      url: "empleados",
      endPoint: "employee",
      inMenu: true
    },
    {
      title: "Gestionar Oficinas",
      icon: "domain",
      url: "oficinas",
      endPoint: "offices",
      inMenu: true
    },

    {
      title: "Gestionar Oficinas",
      icon: "domain",
      url: "gamas",
      endPoint: "product_gamas",
      inMenu: false
    },
    {
      title: "Gestionar Proveedores",
      icon: "team",
      url: "proveedores",
      endPoint: "suppliers",
      inMenu: false
    },
    {
      title: "Gestionar Ciudades",
      icon: "city",
      url: "ciudades",
      endPoint: "cities",
      inMenu: false
      
    },
    {
      title: "Gestionar Estados",
      icon: "status",
      url: "estados",
      endPoint: "order_status",
      inMenu: false
      
    }
  ];

  
  constructor(
    private http: HttpClient, 
  ) {}

  httpGetList = (urlName: string, moreDetails?:string) => {
    return this.http.get<[]>(`${this.URL}/${this.findEndPoint(urlName)}${moreDetails? '/'+moreDetails: ''}`)
  }

  httpGetById = (urlName: string, id:string) => {
    return this.http.get<{}>(`${this.URL}/${this.findEndPoint(urlName)}/${id}`)
  }

  httpDeleteById = (urlName: string, id:string) => {
    return this.http.delete<{}>(`${this.URL}/${this.findEndPoint(urlName)}/${id}`)
  }

  httpCreate = (urlName: string, data:any) => {
    return this.http.post<{}>(`${this.URL}/${this.findEndPoint(urlName)}`, data)
  }

  httpUpdate= (urlName: string, id:string, data:any) => {
    return this.http.put<{}>(`${this.URL}/${this.findEndPoint(urlName)}/${id}`, data)
  }


  findEndPoint(urlName: string): string | undefined {
    const menuItem = this.menu.find(menu => menu.url === urlName);
    return menuItem ? menuItem.endPoint : undefined;
  }
  

}
