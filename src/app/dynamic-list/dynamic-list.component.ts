import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrl: './dynamic-list.component.scss'
})
export class DynamicListComponent {
  @ViewChild('listContainer') listContainer!: ElementRef;
  newItem: string = ""
  items: any[] = [
    {
      name: "aw"
    },
     {
      name: "aw1"
    },
      {
      name: "aw2"
    }
  ]
animating: boolean = false;
  addItem(): void {
      if (this.newItem.trim() !== '') {
      this.animating = true; // Set animation flag to true
      this.items.unshift({ name: this.newItem }); // Add new item to the beginning of the array
      this.newItem = ''; // Clear the input field after adding
      // Set a timeout to reset the animation flag after the animation duration
      setTimeout(() => {
        this.animating = false;
      }, 500); // Adjust this value to match your animation duration
    }
   }
addNewListItem(): void {
    const listContainer = this.listContainer.nativeElement;
    const newListItem = document.createElement('li');
    newListItem.className = 'border-1 border-round border-gray-400 fade-in-from-top';
  newListItem.textContent = this.newItem
    listContainer.insertBefore(newListItem, listContainer.firstChild);

    const listItems = listContainer.querySelectorAll('li');
    listItems.forEach((item: HTMLElement, index: number) => {
      if (index !== 0) {
        item.style.transform = `translateY(${index * 40}px)`; // Adjust as needed
      }
    });
  }
}
