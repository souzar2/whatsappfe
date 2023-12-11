import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appReactOnView]'
})
export class ReactOnViewDirective {
  @Output() onView = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(){
    const observedElement = this.elRef.nativeElement
    const observer = new IntersectionObserver(([entry]) => {
      // Se componente está aparecendo na View, é emitido evento;
      if(entry.isIntersecting) {
        // console.debug('OnView');
        this.onView.emit();
      }
    })
    observer.observe(observedElement);
  }
}

