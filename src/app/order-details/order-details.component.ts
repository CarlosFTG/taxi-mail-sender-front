import { Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import {OrderService} from '../services/order.service'

interface Shift {
  value: string;
}
@Component({
  selector: 'app-order-details',
  template: 'passed in {{ data.name }}',
  standalone: true,
  imports: [MatInputModule, MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})

export class OrderDetailsComponent {
  dataInj = inject(MAT_DIALOG_DATA); 
  dialogRef=inject(MatDialogRef<OrderDetailsComponent>)
  modify=this.dataInj.modify;
  dataSource: any = [];
  orderId:any;

  ngOnInit(): void {
    this.getOrderByUser(this.dataInj.userId);
  }

  constructor(private orderService: OrderService,
  ) { }

  getOrderByUser(userId: string){
    this.orderService.getOrderByUserId(userId).subscribe(data => {
      this.orderId=data.order[0]._id;
       for (let i = 0; i < data.order[0].days.length; i++) {
        this.dataSource.push(this.convertDateToString(data.order[0].days[i]));
      } 
    });
  }

  convertDateToString(data: any){
    let dateString =data.date.slice(0, 10);
    data.date=dateString
    return data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  //busca el día del cambio de turno y modifica el turno
  onChange(shift: string,date: any) {
    let index;
    for (let i = 0; i < this.dataSource.length; i++) {
      if(date==this.dataSource[i].date){
        index=i
        this.dataSource[i].shift=shift;
      }
    }
  }

  saveChanges(){
    //for (let i = 0; i < this.dataSource.length; i++) {
      this.orderService.updateOrderByUser(this.dataSource,this.orderId)
    //}
  }
}
