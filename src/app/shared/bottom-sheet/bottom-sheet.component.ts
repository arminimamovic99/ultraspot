import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  @Input() isOpen = false;
  @Input() toggleEmitter?: EventEmitter<boolean>;

  ngOnInit() {
    if (this.toggleEmitter) {
      this.toggleEmitter.subscribe((data) => {
        console.log({data})
        this.isOpen = data;
      });
    }
  }
  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
