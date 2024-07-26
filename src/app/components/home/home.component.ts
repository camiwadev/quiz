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
  

}


viewDetail(specialist:any){
  this.global.previewRequest=specialist;
  this.global.setRoute('specialistdetail')
}


ngOnInit(): void {
  
}

onIsError(): void {
  this.isError = true;
  /* setTimeout(() => {
    this.isError = false;
  }, 4000); */
}
}
