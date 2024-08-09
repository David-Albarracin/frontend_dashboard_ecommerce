/*
--------------->  
role
--------------->
*/
export interface Role {
  role_id: number;
  name: 'ADMIN' | 'USER';
}

export interface Audit{
  createAt: Date,
  updatedAt: Date,
  isActive: boolean
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
countryId: number;
name: string;
}

/*
--------------->  
region
--------------->
*/
export interface Region {
regionId: number;
name: string;
country: Country;
}
/*
--------------->  
city
--------------->
*/
export interface City {
  cityId: number;
  name: string;
  region: Region;
}

/*
--------------->  
customer
--------------->
*/
export interface Customer {
  customerId: number;
  firstName: string;
  firstSurname: string;
  lastName: string;
  lastSurname: string;
  documentNumber: string;
  documentType: 'CEDULA_CIUDADANIA' | 'CEDULA_EXTRANJERIA' | 'NIT' | 'PASAPORTE';
  employee: Employee;
  audit: Audit;
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
  orderId: number;
  orderDate?: Date;
  expectedDate?: Date;
  deliverDate?: Date;
  commentary?: string;
  status: Status;
  orderType?: 'COMPRA' | 'VENTA';
  customer: Customer;
  orderDetails?: OrderDetail[]
}

export interface Status{
  orderStatusId: number,
  name: string,
  description: string
  isActive: boolean,
}

/*
--------------->  
supplier
--------------->
*/
export interface Supplier {
  supplierId: number;
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
  officeId: number;
  addressLine1: string;
  addressLine2: string;
  city: City;
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
  chargeId: number;
  chargeName: string;
}

/*
--------------->  
Employee
--------------->
*/
export interface Employee {
  employeeId: number;
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  documentNumber: string;
  phoneNumber: string;
  documentType: 'CEDULA_CIUDADANIA' | 'CEDULA_EXTRANJERIA' | 'NIT' | 'PASAPORTE';
  office: Office;
  extension: number;
  charge: Charge;
  boss: Employee;
  audit: Audit
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
  productId: number;
  code: string;
  name?: string;
  productGama: ProductGama | number;
  description?: string;
  stock?: number;
  priceSale?: number;
  priceBuy?: number;
  supplier: Supplier | number
}

/*
--------------->  
order_detail
--------------->
*/
export interface OrderDetail {
  orderDetailId?: number;
  amount?: number;
  unitPrice?: number;
  totalPrice?: number;
  orderLine?: string;
  product?: Product;
  customerOrder?: Orders;
}

/*
--------------->  
pay_methods
--------------->
*/
export interface PayMethods {
  payMethodId: number;
  name: string;
  description?: string;
}

/*
--------------->  
transaction
--------------->
*/
export interface Transactions {
  transactionId: number;
  amount: number;
  transactionDate: Date;
  payMethod: PayMethods;
  order: Orders;
}
