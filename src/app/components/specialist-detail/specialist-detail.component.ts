import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  RendererFactory2,
} from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { GlobalService } from '@app/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { CustomCalendarHeaderComponent,MY_DATE_FORMATS } from '../custom-calendar-header/custom-calendar-header.component'; // Ajusta la ruta
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-specialist-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CustomCalendarHeaderComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class SpecialistDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  workingDays = [ 'tuesday', 'wednesday', 'thursday', 'friday'];
  private mutationObserver: MutationObserver;
  headerComponent = CustomCalendarHeaderComponent;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    public global: GlobalService,
    private cdr: ChangeDetectorRef,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.scrollToTop();
   
    this.mutationObserver = new MutationObserver(() =>
      this.disableNonWorkingDays()
    );
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.disableNonWorkingDays();
    this.observeCalendarChanges();
  }

  clean() {
    this.workingDays = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
  }

  disableNonWorkingDays() {
    const dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );

    Array.from(dayElements).forEach((element) => {
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel) {
        const date = new Date(ariaLabel);
        const dayOfWeek = date.getDay();

        if (!this.isWorkingDay(dayOfWeek)) {
          this.renderer.setAttribute(element, 'disabled', '');
          this.renderer.addClass(element, 'non-working-day');
        }
      }
    });
  }

  isWorkingDay(day: number): boolean {
    const daysMap = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return this.workingDays.includes(daysMap[day]);
  }

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  showAdd() {
    this.toastr.success(
      'El(la) especialista ha sido agregado(a) a tu lista de favoritos',
      'Favoritos'
    );
  }

  showRemove() {
    this.toastr.info(
      'El(la) especialista ha sido removido(a) de tu lista de favoritos',
      'Favoritos'
    );
  }

  onSelectedChange() {
    this.disableNonWorkingDays();
  }

  observeCalendarChanges() {
    const calendarBody = document.querySelector(
      'mat-calendar .mat-calendar-content'
    );
    if (calendarBody) {
      this.mutationObserver.observe(calendarBody, {
        childList: true,
        subtree: true,
      });
    }
  }
}
