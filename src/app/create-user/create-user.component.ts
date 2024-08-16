import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule,FormBuilder  } from '@angular/forms';

import {UserService} from '../services/user.service'

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'create-user.component-dialog',
  templateUrl: 'create-user.component.html',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExample {

  constructor(private formBuilder: FormBuilder,private userService: UserService) { }

  signin: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required ]),
    personal_email: new FormControl('', [Validators.email, Validators.required ]),
    adif_email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    first_order: new FormControl('', [Validators.required])
  });
  

  ngOnInit(): void {
    this.signin = this.formBuilder.group(
      {
        name: ['', Validators.required],
        personal_email: ['', [Validators.required, Validators.email]],
        adif_email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        first_order: ['', [Validators.required]]
      }
    );
  }

  createForm() {

    this.signin = new FormGroup({
      'name': new FormControl('', Validators.required),
      'personal_email': new FormControl('', Validators.required),
      'adif_email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'first_order': new FormControl('', Validators.required),
    });
  }

    register(){

      this.userService.registerUser(this.signin);
    }

    
}

