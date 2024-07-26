import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { ScriptService } from './services/script.service';
import { HomeComponent } from './components/home/home.component';
import { virtualRouter } from './services/virtualRouter.service';
import { AuthRESTService } from './services/auth-rest.service';
import { SpecialityquizComponent } from './components/specialityquiz/specialityquiz.component';
import { PatientquizComponent } from './components/patientquiz/patientquiz.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HomeComponent,
    SpecialityquizComponent,
    PatientquizComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'camiwa';
  constructor(
    public global: GlobalService,
    public script: ScriptService,
    public virtualRouter: virtualRouter ,
    public autRest:AuthRESTService
 ) {
  this.script.load(
    'bootstrap',
    'jquery', 
    'thankyou',
    'custom',
  )
    .then(() => {
      console.log('Todos los scripts se cargaron correctamente');
    })
    .catch(error => console.log(error));
    // this.epicFunction();
    this.global.allLoaded=true;
  }
}

