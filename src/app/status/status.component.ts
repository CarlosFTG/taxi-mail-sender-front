import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';


import { FormGroup, FormControl, Validators,ReactiveFormsModule,FormBuilder  } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-status',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogContent,
    MatCardModule,
    MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  private _snackBar = inject(MatSnackBar);
  dialogRef=inject(MatDialogRef<StatusComponent>)
  dataInj = inject(MAT_DIALOG_DATA);
  status=true;

  constructor(private formBuilder: FormBuilder,private userService: UserService) { 

  }

  nextOrderDate: FormGroup = new FormGroup({
    next_order: new FormControl()
  });

  ngOnInit(): void {
    this.nextOrderDate = this.formBuilder.group({
      next_order: []
    }
    )
  }

  desactivateOrders(){
    this.dataInj=false;
    this.status=false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(){
   if(this.dataInj.userStatus){
    this.dataInj.userStatus=false;
    }else{
      this.dataInj.userStatus=true;
    } 

    //detecta si se cambia a activo y obliga a meter fecha
    if(this.dataInj.userStatus && this.nextOrderDate.value.next_order ==null){
      this.openSnackBar('Debe seleccionar una fecha','X')
    }else{
      this.userService.changeUserStatus(
        this.dataInj.idUser,this.nextOrderDate.value.next_order, this.dataInj.userStatus);
      this.dialogRef.close();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
