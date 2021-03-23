import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDrivenService {

  sourceEventSubject: Subject<ActionEvent> = new Subject();
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();

  constructor() { }

  /*
  Permet de publier l'évènement dans le subject: sourceEventSubject, 
  et tout composant qui fait un subscribe à l'observable: sourceEventSubjectObservable, 
  va recevoir l'évènement.
  */
  publishEvent(event:ActionEvent) {
    this.sourceEventSubject.next(event);
  }
}