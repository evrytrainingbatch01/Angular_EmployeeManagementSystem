import { EmployeeBasicDetails } from './employeeBasicDetails.model';
import { EmployeeMoreDetails } from './employeeMoreDetails.model';

export class Employee{
     id:number;
     employeeBasicDetails:EmployeeBasicDetails=new EmployeeBasicDetails();
     employeeMoreDetails:EmployeeMoreDetails=new EmployeeMoreDetails();
}