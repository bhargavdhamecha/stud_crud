import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal:ModalComponent) { }


}
