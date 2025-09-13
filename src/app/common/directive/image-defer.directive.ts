import { Directive, ElementRef,OnInit  } from '@angular/core';

@Directive({
  selector: '[appImageDefer]'
})
export class ImageDeferDirective implements OnInit{

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.elementRef.nativeElement);

  }



private loadImage() {
  const imgElement: HTMLImageElement = this.elementRef.nativeElement;
  const src = imgElement.getAttribute('data-src');
  if (src) {
    imgElement.src = src;
  }
}

}