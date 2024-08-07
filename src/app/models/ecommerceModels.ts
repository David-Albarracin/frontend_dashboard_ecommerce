/*
--------------->  
role
--------------->
*/
export interface Role {
  role_id: number;
  name: 'ADMIN' | 'USER';
}

/*
--------------->  
account
--------------->
*/
export interface Account {
account_id: number;
username: string;
password: string;
created_at: Date;
updated_at: Date;
isActive: boolean;
accountNoExpired : boolean;
accountNoLocked : boolean;
credentialNoExpired : boolean;
}
/*
--------------->  
permission
--------------->
*/
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

/*
--------------->  
country
--------------->
*/
export interface Country {
country_id: number;
name: string;
}

/*
--------------->  
region
--------------->
*/
export interface Region {
region_id: number;
name: string;
country_id: number;
}
/*
--------------->  
city
--------------->
*/
export interface City {
  city_id: number;
  name: string;
  region_id: number;
}

/*
--------------->  
customer
--------------->
*/
export interface Customer {
  customer_id: number;
  first_name: string;
  first_surname: string;
  last_name: string;
  last_surname: string;
  document_number: string;
document_type: 'CEDULA_CIUDADANIA' | 'CEDULA_EXTRANJERIA' | 'NIT' | 'PASAPORTE';
  employee_id: number;
  created_at: Date;
  updated_at: Date;
is_active : boolean;	
}

/*
--------------->  
customer_address
--------------->
*/
export interface CustomerAddress {
  customer_address_id: number;
  address_line1: string;
  address_line2: string;
  customer_id: number;
  city_id: number;
}

/*
--------------->  
customer_phone
--------------->
*/
export interface CustomerPhone {
  customer_phone_id: number;
  phone_number: string;
  telephone_type: 'FIJO' | 'CELULAR';
  customer_id: number;
}

/*
--------------->  
order_status
--------------->
*/
export interface OrderStatus {
  order_status_id: number;
  name: string;
  description?: string;
  isActive?: string;
}

/*
--------------->  
orders
--------------->
*/
export interface Orders {
  order_id: number;
  order_date?: Date;
  expected_date?: Date;
  deliver_date?: Date;
  commentary?: string;
  status_id: number;
  order_type?: 'COMPRA' | 'VENTA';
  customer_id: number;
}

/*
--------------->  
supplier
--------------->
*/
export interface Supplier {
  supplier_id: number;
  name: string;
  contact_name?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
is_active: Boolean;
}

/*
--------------->  
supplier_phone
--------------->
*/
export interface SupplierPhone {
  supplier_phone_id: number;
  phone_number: string;
  telephone_type: 'Fijo' | 'Celular';
  supplier_id: number;
}

/*
--------------->  
supplier_address
--------------->
*/
export interface SupplierAddress {
  supplier_addresses_id: number;
  address_line1: string;
  address_line2: string;
  supplier_id: number;
  city_id: number;
}

/*
--------------->  
supplier_phone
--------------->
*/
export interface Office {
  office_id: number;
  address_line1: string;
  address_line2: string;
  city_id: number;
}
/*
--------------->  
office_phone
--------------->
*/
export interface OfficePhone {
  office_phone_id: number;
  phone_number: string;
  telephone_type: 'FIJO' | 'CELULAR';
  office_id: number;
}

/*
--------------->  
supplier_phone
--------------->
*/
export interface Charge {
  charge_id: number;
  charge_name: string;
}

/*
--------------->  
Employee
--------------->
*/
export interface Employee {
  employee_id: number;
  first_name: string;
  second_name: string;
  first_surname: string;
  second_surname: string;
  document_number: string;
  document_type: 'CEDULA_CIUDADANIA' | 'CEDULA_EXTRANJERIA' | 'NIT' | 'PASAPORTE';
  office_id: number;
  extension: number;
  charge_id: number;
  created_at: Date;
  updated_at: Date;
  boss_id: number;
}

/*
--------------->  
product_game
--------------->
*/
export interface ProductGama {
  productGamaId: number;
  description_text?: string;
  description_html?: string;
  image?: string;
}
/*
--------------->  
product
--------------->
*/
export interface Product {
  product_id: number;
  code: string;
  name?: string;
  productGama: ProductGama | number;
  description?: string;
  stock?: number;
  priceSale?: number;
  priceBuy?: number;
}

/*
--------------->  
order_detail
--------------->
*/
export interface OrderDetail {
  amount?: number;
  unit_price?: number;
  total_price?: number;
  order_line?: number;
  product_id: number;
  customer_order_id: number;
}

/*
--------------->  
pay_methods
--------------->
*/
export interface PayMethods {
  pay_method_id: number;
  name: string;
  description?: string;
}

/*
--------------->  
transaction
--------------->
*/
export interface Transactions {
  transaction_id: number;
  amount: number;
  transaction_date: Date;
  pay_method_id: number;
  order_id: number;
}
