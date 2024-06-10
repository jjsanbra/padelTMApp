import { Component } from '@angular/core';
import { TranslateDirective } from 'app/shared/language';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [TranslateDirective, SharedModule],
})
export default class FooterComponent {}
