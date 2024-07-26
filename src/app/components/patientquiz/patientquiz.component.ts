import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { DataApiService } from '@app/services/data-api-service';
import { GlobalService } from '@app/services/global.service';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { Yeoman } from '@app/services/yeoman.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patientquiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patientquiz.component.html',
  styleUrl: './patientquiz.component.css'
})
export class PatientquizComponent {
  submitted= false;
  ngFormPatients: FormGroup;
  public isError = false;
    currentStep: number = 1; // Paso actual

constructor(
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public http: HttpClient,
  public formBuilder: FormBuilder,
  public dataApiService: DataApiService,
  public yeoman: Yeoman
){this.ngFormPatients = this.formBuilder.group({
  p1: ['', Validators.requiredTrue],
  p2: ['', Validators.requiredTrue],
  p3: ['', Validators.requiredTrue],
  p4: ['', Validators.requiredTrue],
  p5: ['', Validators.requiredTrue],
  p6: ['', Validators.requiredTrue],
  p7: ['', Validators.requiredTrue],
  p8: ['', Validators.requiredTrue],
  p9: ['', Validators.requiredTrue],
  p10: ['', Validators.requiredTrue],
  p11: ['', Validators.requiredTrue],
  p12: ['', Validators.requiredTrue]

});
}

get f(): { [key: string]: AbstractControl } {
return this.ngFormPatients.controls;
}

viewDetail(specialist:any){
this.global.previewRequest=specialist;
this.global.setRoute('')
}

quizsPatients() {
this.submitted = true; 

// Verifica si el formulario es válido antes de enviarlo
/*  if (this.ngFormPatients.invalid) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
  });
  return;
} */

let data: any = this.ngFormPatients.value;


this.dataApiService.sendPatient(data).subscribe(
  (response) => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Encuesta enviada, Gracias por su participación.'
    }).then(() => {
      // Limpiar los valores para futuros usos
      /* this.global.request = '';
      this.yeoman.allrequest.push(response);
      this.yeoman.allrequest = [...this.yeoman.allrequest]; */
      this.isError = false;
      
      // Reiniciar el formulario
      this.ngFormPatients.reset();
      this.submitted = false;  // Resetear el estado de envío

      // Recargar la página
      window.location.reload();
    });

    console.log('Solicitud guardada correctamente:', response);
  },
  (error) => {
    this.onIsError();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al guardar la solicitud. Por favor, inténtelo de nuevo más tarde.'
    });
    console.log('Error al guardar la solicitud:', error);
  }
);
}
ngOnInit(): void {
this.ngFormPatients = this.formBuilder.group({
  p1: ['', Validators.requiredTrue],
  p2: ['', Validators.requiredTrue],
  p3: ['', Validators.requiredTrue],
  p4: ['', Validators.requiredTrue],
  p5: ['', Validators.requiredTrue],
  p6: ['', Validators.requiredTrue],
  p7: ['', Validators.requiredTrue],
  p8: ['', Validators.requiredTrue],
  p9: ['', Validators.requiredTrue],
  p10: ['', Validators.requiredTrue],
  p11: ['', Validators.requiredTrue],
  p12: ['', Validators.requiredTrue]

});
}

onIsError(): void {
  this.isError = true;
  /* setTimeout(() => {
    this.isError = false;
  }, 4000); */
  }
}
