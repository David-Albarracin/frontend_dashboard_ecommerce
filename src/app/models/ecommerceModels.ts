// Role Table
export interface Role {
    role_id: number;
    name: 'ADMIN' | 'USER';
  }
  
  // Account Table
  export interface Account {
    account_id: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    isActive: boolean;
    //rol_id: number;
  }
  
  // Permission Table
  export interface Permission {
    permission_id: number;
    name: string;
  }
  
  // RolePermission Table
//   export interface RolePermission {
//     role_id: number;
//     permission_id: number;
//   }
  
  // AccountRole Table
//   export interface AccountRole {
//     account_id: string;
//     role_id: number;
//   }
  
  // Country Table
  export interface Country {
    country_id: number;
    name: string;
  }
  
  // Region Table
  export interface Region {
    region_id: number;
    name: string;
    country_id: number;
  }
  
  // City Table
  export interface City {
    city_id: number;
    name: string;
    region_id: number;
  }
  
  // Customer Table
  export interface Customer {
    customer_id: number;
    account_id: string;
    first_name: string;
    first_surname: string;
    last_name: string;
    last_surname: string;
    document_number: string;
    document_type: 'Cedula Ciudadania' | 'Cedula Extranjeria' | 'NIT' | 'Pasaporte';
    employee_id: string;
    created_at: Date;
    updated_at: Date;
  }
  
  // CustomerAddress Table
  export interface CustomerAddress {
    customer_address_id: number;
    address_line1: string;
    address_line2: string;
    customer_id: number;
    city_id: number;
  }
  
  // CustomerPhone Table
  export interface CustomerPhone {
    customer_phone_id: number;
    phone_number: string;
    telephone_type: 'Fijo' | 'Celular';
    customer_id: number;
  }
  
  // OrderStatus Table
  export interface OrderStatus {
    order_status_id: number;
    name?: string;
    description?: string;
    isActive?: string;
  }
  
  // Orders Table
  export interface Orders {
    order_id: number;
    order_date?: Date;
    expected_date?: Date;
    deliver_date?: Date;
    commentary?: string;
    status_id: number;
    order_type?: 'Compra' | 'Venta';
    customer_id: number;
  }
  
  // Supplier Table
  export interface Supplier {
    supplier_id: number;
    name: string;
    contact_name?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  // SupplierPhone Table
  export interface SupplierPhone {
    supplier_phone_id: number;
    phone_number: string;
    telephone_type: 'Fijo' | 'Celular';
    supplier_id: number;
  }
  
  // SupplierAddress Table
  export interface SupplierAddress {
    supplier_addresses_id: number;
    address_line1: string;
    address_line2: string;
    supplier_id: number;
    city_id: number;
  }
  
  // Office Table
  export interface Office {
    office_id: string;
    address_line1: string;
    address_line2: string;
    city_id: number;
    phone_number: string;
  }
  
  // OfficePhone Table
  export interface OfficePhone {
    office_phone_id: number;
    phone_number: string;
    telephone_type: 'Fijo' | 'Celular';
    office_id: string;
  }
  
  // OfficeAddress Table
  export interface OfficeAddress {
    office_addresses_id: number;
    address_line1: string;
    address_line2: string;
    office_id: string;
    city_id: number;
  }
  
  // Charge Table
  export interface Charge {
    charge_id: number;
    charge_name: string;
  }
  
  // Employee Table
  export interface Employee {
    employee_id: string;
    account_id: string;
    first_name: string;
    second_name: string;
    first_surname: string;
    second_surname: string;
    document_number: string;
    document_type: 'Cedula Ciudadania' | 'Cedula Extranjeria' | 'NIT' | 'Pasaporte';
    phone_number: string;
    office_id: string;
    extension: number;
    charge_id: number;
    created_at: Date;
    updated_at: Date;
    boss_id: string;
  }
  
  // ProductGama Table
  export interface ProductGama {
    productGamaId: string;
    description_text?: string;
    description_html?: string;
    image?: string;
  }
  
  // Product Table
  export interface Product {
    product_id: number;
    code: string;
    name?: string;
    productGama: ProductGama | string;
    description?: string;
    stock?: number;
    priceSale?: number;
    priceBuy?: number;
  }
  
  // OrderDetail Table
  export interface OrderDetail {
    amount?: number;
    unit_price?: number;
    total_price?: number;
    order_line?: number;
    product_id: number;
    customer_order_id: number;
  }
  
  // PayMethods Table
  export interface PayMethods {
    pay_method_id: number;
    name: string;
    description?: string;
  }
  
  // Transactions Table
  export interface Transactions {
    transaction_id: number;
    amount: number;
    transaction_date: Date;
    pay_method_id: number;
    order_id: number;
  }
  