import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../app/services/data.service';

import {DialogData, DialogOverviewExample} from '../create-user/create-user.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatTableModule,MatIconModule,MatButtonModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'taxi-mail-sender';

  displayedColumns: string[] = ['name','adif_email','status','operations'];
  dataSource: any = [];

  data: any;

  constructor(private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      
      this.dataSource.push(data.usuarios[0]);
      console.log(this.dataSource);
    });
  }
   openDialog(this: any) {
    const dialogo = this.dialog.open(DialogOverviewExample, {
      
    });
}

}