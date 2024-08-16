import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../app/services/data.service';

import { DialogOverviewExample } from './create-user/create-user.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';

export interface DialogData {
  userName: string;
  userId:String
}

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
  dataSource: any = [];

  data: any;

  constructor(private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      for (let i = 0; i < data.users.length; i++) {
        this.dataSource.push(data.users[i]);
      }
    });
  }
  openCreateUser() {
    this.dialog.open(DialogOverviewExample, {
    });
  }

  openOrderDetails(userId: String, name: String, modify:boolean) {
    this.dialog.open(OrderDetailsComponent, 
      {data: {userId, name,modify}})
  }
  
}
