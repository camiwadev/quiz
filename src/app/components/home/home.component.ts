import { Component ,ViewEncapsulation,AfterViewInit, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { virtualRouter } from '@app/services/virtualRouter.service';
import { AuthRESTService } from '@app/services/auth-rest.service';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormBuilder,
  AbstractControl, Validators, FormGroup } from '@angular/forms';
import { DataApiService } from '@app/services/data-api-service';
import { Yeoman } from '@app/services/yeoman.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

  encapsulation: ViewEncapsulation.Emulated 
})
export class HomeComponent implements OnInit {
  submitted= false;
  ngFormRequest: FormGroup;
  public isError = false;

constructor(
  public global:GlobalService,
  public virtualRouter:virtualRouter,
  public authRest:AuthRESTService,
  public http: HttpClient,
  public formBuilder: FormBuilder,
  public dataApiService: DataApiService,
  public yeoman: Yeoman
){
  this.ngFormRequest = this.formBuilder.group({
    r1: ['', Validators.requiredTrue],
    /* r2: ['', Validators.requiredTrue],
    r3: ['', Validators.requiredTrue],
    r4: ['', Validators.requiredTrue],
    r5: ['', Validators.requiredTrue],
    r6: ['', Validators.requiredTrue] */
  });
  if(this.authRest.isLogin()){
    // this.virtualRouter.routerActive="dashboard";
    this.global.setRoute("dashboard")
  }

}
get f(): { [key: string]: AbstractControl } {
  return this.ngFormRequest.controls;
}

viewDetail(specialist:any){
  this.global.previewRequest=specialist;
  this.global.setRoute('specialistdetail')
}

quizpacientes() {
  this.submitted = true; 

  // Verifica si el formulario es válido antes de enviarlo
 /*  if (this.ngFormRequest.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
    });
    return;
  } */

  let data: any = this.ngFormRequest.value;
  
  
  this.dataApiService.sendSpecialist(data).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Solicitud guardada correctamente.'
      }).then(() => {
        // Limpiar los valores para futuros usos
        this.global.request = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;
        
        // Reiniciar el formulario
        this.ngFormRequest.reset();
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
  this.ngFormRequest = this.formBuilder.group({
    r1: ['', Validators.requiredTrue],
    /* r2: ['', Validators.requiredTrue],
    r3: ['', Validators.requiredTrue],
    r4: ['', Validators.requiredTrue],
    r5: ['', Validators.requiredTrue],
    r6: ['', Validators.requiredTrue] */
  });
}

onIsError(): void {
  this.isError = true;
  /* setTimeout(() => {
    this.isError = false;
  }, 4000); */
}
}
