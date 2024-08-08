import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/admin/dashboard-page/dashboard-page.component';
import { DashboardHomeComponent } from './dashboard/admin/dashboard-home/dashboard-home.component';
import { SingInComponent } from './authentication/sing-in/sing-in.component';
import { SingUpComponent } from './authentication/sing-up/sing-up.component';
import { DashboardProductsComponent } from './dashboard/admin/products/dashboard-products/dashboard-products.component';
import { DashboardProductsListComponent } from './dashboard/admin/products/dashboard-products-list/dashboard-products-list.component';
import { DashboardCustomersListComponent } from './dashboard/admin/customers/dashboard-customers-list/dashboard-customers-list.component';
import { DashboardCustomersComponent } from './dashboard/admin/customers/dashboard-customers/dashboard-customers.component';
import { DashboardOrdersListComponent } from './dashboard/admin/orders/dashboard-orders-list/dashboard-orders-list.component';
import { DashboardOrdersComponent } from './dashboard/admin/orders/dashboard-orders/dashboard-orders.component';
import { DashboardPaymentsComponent } from './dashboard/admin/payments/dashboard-payments/dashboard-payments.component';
import { DashboardPaymentsListComponent } from './dashboard/admin/payments/dashboard-payments-list/dashboard-payments-list.component';
import { DashboardEmployeeListComponent } from './dashboard/admin/employee/dashboard-employee-list/dashboard-employee-list.component';
import { DashboardEmployeeComponent } from './dashboard/admin/employee/dashboard-employee/dashboard-employee.component';
import { DashboardOfficeComponent } from './dashboard/admin/office/dashboard-office/dashboard-office.component';
import { DashboardOfficeListComponent } from './dashboard/admin/office/dashboard-office-list/dashboard-office-list.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { DashboardListComponent } from './dashboard/admin/dashboard-list/dashboard-list.component';

export const routes: Routes = [
    {
        path: '',  
        redirectTo: '/sign-in', 
        pathMatch: 'full' 
    },
    {
        path:  'dashboard',
        canActivate:[adminAuthGuard],
        component: DashboardPageComponent,
        children: [
            {
                path: '',
                component: DashboardHomeComponent
            },

            {
                path: 'inicio',
                component: DashboardHomeComponent
            },
            {
                path: 'filtro',
                component: DashboardListComponent
            },
            {
                path: 'productos', 
                component: DashboardProductsListComponent 
            },
            { 
                path: 'productos/agregar', 
                component: DashboardProductsComponent 
            },
            { 
                path: 'productos/editar/:id', 
                component: DashboardProductsComponent 
            },
            { 
                path: 'clientes', 
                component: DashboardCustomersListComponent 
            },
            { 
                path: 'clientes/agregar', 
                component: DashboardCustomersComponent 
            },
            { 
                path: 'clientes/editar/:id', 
                component: DashboardCustomersComponent 
            },
            { 
                path: 'pedidos', 
                component: DashboardOrdersListComponent
            },
            { 
                path: 'pedidos/agregar', 
                component: DashboardOrdersComponent 
            },
            { 
                path: 'pedidos/editar/:id', 
                component: DashboardOrdersComponent 
            },
            { 
                path: 'pagos', 
                component: DashboardPaymentsListComponent
            },
            { 
                path: 'pagos/agregar', 
                component: DashboardPaymentsComponent 
            },
            { 
                path: 'pagos/editar/:id', 
                component: DashboardPaymentsComponent 
            },
            { 
                path: 'empleados', 
                component: DashboardEmployeeListComponent
            },
            { 
                path: 'empleados/agregar', 
                component: DashboardEmployeeComponent 
            },
            { 
                path: 'empleados/editar/:id', 
                component: DashboardEmployeeComponent 
            },
            { 
                path: 'oficinas', 
                component: DashboardOfficeListComponent
            },
            { 
                path: 'oficinas/agregar', 
                component: DashboardOfficeComponent
            },
            { 
                path: 'oficinas/editar/:id', 
                component: DashboardOfficeComponent 
            },
        ]
    },

    {
        path: 'sign-in',  
        component: SingInComponent
    },

    {
        path: 'sign-up',  
        component: SingUpComponent
    },

    {
        path: '**',  
        redirectTo: '/sign-in', 
        pathMatch: 'full'
    }
    
];
