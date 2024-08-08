import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

import { DataService } from '../app/services/data.service';

export interface PeriodicElement {
  name: string;
  position: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'taxi-mail-sender';

  displayedColumns: string[] = ['name','adif_email','status'];
  dataSource: any = [];

  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      
      this.dataSource.push(data.usuarios[0]);
      console.log(this.dataSource);
    });
  }
}
