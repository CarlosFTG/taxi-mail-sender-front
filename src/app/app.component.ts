import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../app/services/data.service';

import { DialogOverviewExample } from './create-user/create-user.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StatusComponent } from './status/status.component';
import { UserService } from './services/user.service';

export interface DialogData {
  userName: string;
  userId:String
}

export interface User {
  name: string
  id:string
}

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'taxi-mail-sender';
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'adif_email', 'status', 'operations'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  data: any;

  constructor(private dataService: DataService, private userService: UserService
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data=>{
      for (let i = 0; i < data.users.length; i++) {
        ELEMENT_DATA.push(data.users[i])
      }
    })
  }
  openCreateUser() {
    const dialogRef=this.dialog.open(DialogOverviewExample, {
    });
    dialogRef.afterClosed().subscribe(result => {
      ELEMENT_DATA.push(result.data.usuario);
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  openOrderDetails(userId: String, name: String, modify:boolean) {
    this.dialog.open(OrderDetailsComponent, 
      {data: {userId, name,modify}})
  }

  openStatusDialog(userStatus: any, idUser: any){
    this.dialog.open(StatusComponent,{data:{userStatus,idUser}});
  }

  deleteUser(userId: string){
    this.userService.removeUser(userId).subscribe(data=>{
      console.log(data)
    });
  }
  
}
