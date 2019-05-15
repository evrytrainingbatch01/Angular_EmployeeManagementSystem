import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeDataSource } from '../models/employeeDataSource.model';
import { MultiFormStepperComponent } from '../multi-form-stepper/multi-form-stepper.component';
import { EmployeeService } from '../shared/employee.service';
import { EmployeeResponseWrapper } from '../models/employeeResponseWrapper.model';
import {LocalStorageService} from 'ngx-webstorage';
import {NotificationsService} from '../shared/notification/notifications.service'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { SelectionModel, isDataSource } from '@angular/cdk/collections';
import { Employee } from '../models/employee.model';
import { EmployeeIds } from '../models/employeeIds.model';


@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.css']
})
export class ListOfEmployeesComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  listOfEmployees:EmployeeDataSource[];
  displayColumns:string[]=['select','id','employeeBasicDetails.fullName','employeeBasicDetails.dateOfBirth','employeeBasicDetails.email','employeeBasicDetails.mobile','employeeBasicDetails.employeeType','employeeMoreDetails.hireDate','employeeMoreDetails.gender','employeeMoreDetails.department','employeeMoreDetails.maritalStatus','actions'];
  listofEmployeesDataSource:MatTableDataSource<any>;
  searchKey:string;
  employeeList;
  matDialogCofig:MatDialogConfig;
 initialSelection = [];
allowMultiSelect = true;
employeeids:number[]=new Array();
ids:EmployeeIds=new EmployeeIds();
  
  constructor(private dialogue:MatDialog,private employeeService:EmployeeService
    ,private localStorageService:LocalStorageService
    ,private notificationService:NotificationsService
    ,private matDialog:MatDialog) {}


selection = new SelectionModel<Employee>(this.allowMultiSelect, this.initialSelection);

  ngOnInit() {

    
this.employeeService.getEmployeeList()
  .subscribe(
     (data)=>{
       
       console.log(JSON.stringify(data));
        this.employeeList=data.List;
        console.log(this.employeeList);
        this.listofEmployeesDataSource=new MatTableDataSource<Employee>(this.employeeList);
        

        this.listofEmployeesDataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //this.listofEmployeesDataSource.sort=this.sort;
        this.listofEmployeesDataSource.paginator=this.paginator;

  //    this.dataSource = new MatTableDataSource(yourData);
   this.listofEmployeesDataSource.sortingDataAccessor = (item, property) => {
    //switch(property) {
  //   case 'employeeBasicDetails.fullName': return item.employeeBasicDetails.fullName;
  //  default: return item[property];

  if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item)
     return item[property];
  //}
  };
  this.listofEmployeesDataSource.sort = this.sort;
 // this.listofEmployeesDataSource.filterPredicate = (data, filter) => JSON.stringify(data).includes(filter);
 
     },
     error=>{
      console.log(error);
      this.notificationService.error(":: Something went wrong . please try again");
     }
  );

  
  }
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.listofEmployeesDataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // console.log("this is from isallselecte"+JSON.stringify(this.listofEmployeesDataSource.data));
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);
    // console.log(JSON.stringify(this.selection.selected));
    const numRows = this.listofEmployeesDataSource.data.length;
    // console.log(numRows);
    
    return numSelected === numRows;
    
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.listofEmployeesDataSource.data.forEach(row => this.selection.select(row));
  // }

  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
        this.listofEmployeesDataSource.data.forEach(row => this.selection.select(row));

        // console.log(this.isAllSelected());
        // console.log(this.selection.selected);

  }
  

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?:Employee): string {

    //console.log(row);
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  onSearchClear()
  {
    this.searchKey="";
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterValue:string)
  {
     console.log(this.searchKey.trim().toLowerCase());
     console.log( this.listofEmployeesDataSource);

    
  // debugger
     console.log(this.listofEmployeesDataSource.filter);
     this.listofEmployeesDataSource.filter=filterValue.trim().toLowerCase();

    
    
  }

  
  onCreateEmployee()
  {
    this.employeeService.initializeFormOnCreate();
    const dialogueConfig:MatDialogConfig=new MatDialogConfig();
    dialogueConfig.disableClose=true;
    dialogueConfig.autoFocus=true;
    dialogueConfig.width="950px";
    dialogueConfig.height="500px";
     this.openComponentPopup(dialogueConfig).afterClosed()
     .subscribe(
       returnControl=>{
         console.log(returnControl);
         this.reusableGetEmployeeListCall();
         
         

       }
     );
  }

  openComponentPopup(dialogueConfig){
  return this.dialogue.open(MultiFormStepperComponent, dialogueConfig);
}

reusableGetEmployeeListCall(){
  this.employeeService.getEmployeeList()
  .subscribe(
     (data)=>{
       console.log(JSON.stringify(data));
        this.employeeList=data.List;
        console.log(this.employeeList);
        this.listofEmployeesDataSource=new MatTableDataSource(this.employeeList);
        this.listofEmployeesDataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //this.listofEmployeesDataSource.sort=this.sort;
        this.listofEmployeesDataSource.paginator=this.paginator;

  //    this.dataSource = new MatTableDataSource(yourData);
   this.listofEmployeesDataSource.sortingDataAccessor = (item, property) => {
    //switch(property) {
  //   case 'employeeBasicDetails.fullName': return item.employeeBasicDetails.fullName;
  //  default: return item[property];

  if (property.includes('.')) return property.split('.').reduce((o,i)=>o[i], item)
     return item[property];
  //}
  };
  this.listofEmployeesDataSource.sort = this.sort;
},

error=>{
  console.log(error);
              this.notificationService.error(":: Something went wrong . please try again");
}
  );
}

  onEditEmployee(row)
  {
    this.localStorageService.store("employeeId",row.id);
    console.log(this.localStorageService.retrieve("employeeId"));
    this.employeeService.initializeForm3OnEdit(row);
    const dialogueConfig_edit:MatDialogConfig=new MatDialogConfig();
    dialogueConfig_edit.disableClose=true;
    dialogueConfig_edit.autoFocus=true;
    dialogueConfig_edit.width="80%";
    dialogueConfig_edit.height="90%";
    this.openComponentPopup(dialogueConfig_edit).afterClosed()
     .subscribe(
       returnControl=>{
         console.log(returnControl);
this.reusableGetEmployeeListCall();

       }
     );
    
    console.log(row);
  }

  onDeleteMultipleEmployees()
  {
    //  alert("Entered into deleteMultipleEmployees()");
    if(this.selection.selected.length>0)
    {
     if(confirm("Are you sure you want to delete the selected employees?"))
     {

    for(let entry of this.selection.selected)
    {
      console.log(entry.id);
      this.employeeids.push(entry.id);
    }
    console.log(this.employeeids);
    this.ids.employeeIds=this.employeeids;
    this.employeeService.deleteEmployees(this.ids).subscribe(
      data=>{
        console.log(data);
        if(data===true)
        {
          this.notificationService.delete(" Selected employees have been deleted successfully !! ");
               this.reusableGetEmployeeListCall();
        }

      },
      error=>{
        console.log(error);
              this.notificationService.error(":: Something went wrong . please try again");
      }
    );

    this.employeeids=[];
    this.selection.clear();
     }
    }
    else{
      alert("Please select the employees to be deleted");
    }

  }

  
  onDeleteEmployee(row)
  {
    this.matDialogCofig={
     width:'500px',
     panelClass:'confirm-dialog-container',
     disableClose:true
    }
    this.matDialog.open(ConfirmationPopupComponent,this.matDialogCofig).afterClosed()
    .subscribe(
      response=>{
          console.log(response);
          if(response)
          {

            this.employeeService.deleteEmployee(row)
             .subscribe(
              data=>{
                 console.log(data);
               this.notificationService.delete(" Employee has been deleted successfully !! ");
               this.reusableGetEmployeeListCall();
               },
               error=>{
                console.log(error);
                this.notificationService.error(":: Something went wrong . please try again");
               }
        
               
             );
          }
      }
    );
    // if(confirm("Are you sure  you want to delete this Employee?"))
    // {
    //  this.employeeService.deleteEmployee(row)
    //  .subscribe(
    //    data=>{
    //      console.log(data);
    //     this.notificationService.delete(" !!Employee has been deleted successfully ");
    //     this.reusableGetEmployeeListCall();
    //    }

       
    //  );
    
    //   }
      
      
  }
  

//   listOfEmployees:any;
//    p:number=1;
//   constructor() { }

//   ngOnInit() {
//     this.listOfEmployees=[
//       {
//       "Id":"1",
//       "FullName":"Srinivasa Rao",
//       "DateOfBirth":"13/05/1991",
//       "Email":"srinivas@gmail.com",
//       "Mobile":"8904117233",
//       "EmployeeType":"Contract",
//       "HireDate":"04/03/2019",
//       "Gender":"Male",
//       "department":"Development",
//       "Address":"ec-1",
//       "JobLocation":"Bangalore"
//       },
//       {
//         "Id":"2",
//         "FullName":"Moin",
//         "DateOfBirth":"15/06/1990",
//         "Email":"moin@gmail.com",
//         "Mobile":"8941172332",
//         "EmployeeType":"Permanent",
//         "HireDate":"02/06/2019",
//         "Gender":"Male",
//         "department":"Testing",
//         "Address":"ec-2",
//         "JobLocation":"Bangalore"
//         },
//         {
//           "Id":"3",
//           "FullName":"Vinay",
//           "DateOfBirth":"12/07/1992",
//           "Email":"vinay@gmail.com",
//           "Mobile":"9904117244",
//           "EmployeeType":"Contract",
//           "HireDate":"12/11/2018",
//           "Gender":"Male",
//           "department":"Production",
//           "Address":"marathali",
//           "JobLocation":"Bangalore"
//           },
//           {
//             "Id":"4",
//             "FullName":"Manoj",
//             "DateOfBirth":"22/08/1889",
//             "Email":"manoj@gmail.com",
//             "Mobile":"8884117255",
//             "EmployeeType":"Contract",
//             "HireDate":"04/03/2019",
//             "Gender":"Male",
//             "department":"Development",
//             "Address":"bannergatta road",
//             "JobLocation":"Bangalore"
//             },
//             {
//               "Id":"5",
//               "FullName":"Shadiq",
//               "DateOfBirth":"25/08/1991",
//               "Email":"shadiq@gmail.com",
//               "Mobile":"8904117233",
//               "EmployeeType":"Contract",
//               "HireDate":"04/03/2019",
//               "Gender":"Male",
//               "department":"Development",
//               "Address":"banshankari",
//               "JobLocation":"Bangalore"
//               },
//               {
//                 "Id":"6",
//                 "FullName":"Srinivasa Rao6",
//                 "DateOfBirth":"13/05/1991",
//                 "Email":"srinivas@gmail.com",
//                 "Mobile":"8904117233",
//                 "EmployeeType":"Contract",
//                 "HireDate":"04/03/2019",
//                 "Gender":"Male",
//                 "department":"Development",
//                 "Address":"ec-1",
//                 "JobLocation":"Bangalore"
//                 },
//                 {
//                   "Id":"7",
//                   "FullName":"Srinivasa Rao7",
//                   "DateOfBirth":"13/05/1991",
//                   "Email":"srinivas@gmail.com",
//                   "Mobile":"8904117233",
//                   "EmployeeType":"Contract",
//                   "HireDate":"04/03/2019",
//                   "Gender":"Male",
//                   "department":"Development",
//                   "Address":"ec-1",
//                   "JobLocation":"Bangalore"
//                   },
//                   {
//                     "Id":"8",
//                     "FullName":"Srinivasa Rao8",
//                     "DateOfBirth":"13/05/1991",
//                     "Email":"srinivas@gmail.com",
//                     "Mobile":"8904117233",
//                     "EmployeeType":"Contract",
//                     "HireDate":"04/03/2019",
//                     "Gender":"Male",
//                     "department":"Development",
//                     "Address":"ec-1",
//                     "JobLocation":"Bangalore"
//                     },
//                     {
//                       "Id":"9",
//                       "FullName":"Srinivasa Rao9",
//                       "DateOfBirth":"13/05/1991",
//                       "Email":"srinivas@gmail.com",
//                       "Mobile":"8904117233",
//                       "EmployeeType":"Contract",
//                       "HireDate":"04/03/2019",
//                       "Gender":"Male",
//                       "department":"Development",
//                       "Address":"ec-1",
//                       "JobLocation":"Bangalore"
//                       },
//                       {
//                         "Id":"10",
//                         "FullName":"Srinivasa Rao10",
//                         "DateOfBirth":"13/05/1991",
//                         "Email":"srinivas@gmail.com",
//                         "Mobile":"8904117233",
//                         "EmployeeType":"Contract",
//                         "HireDate":"04/03/2019",
//                         "Gender":"Male",
//                         "department":"Development",
//                         "Address":"ec-1",
//                         "JobLocation":"Bangalore"
//                         },
//                         {
//                           "Id":"11",
//                           "FullName":"Srinivasa Rao11",
//                           "DateOfBirth":"13/05/1991",
//                           "Email":"srinivas@gmail.com",
//                           "Mobile":"8904117233",
//                           "EmployeeType":"Contract",
//                           "HireDate":"04/03/2019",
//                           "Gender":"Male",
//                           "department":"Development",
//                           "Address":"ec-1",
//                           "JobLocation":"Bangalore"
//                           },
     
//     ]
//   }
//   changePage(data)
//   {
// // alert(data);
//  this.p=data;
//   }


}
