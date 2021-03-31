import { Component } from '@angular/core'
import { ModalDialogParams } from '@nativescript/angular'

@Component({
  selector: 'MyListSelectorModalView',
  templateUrl: './my-list-selector-modal-view.component.html',
  styleUrls: ['./my-list-selector-modal-view.component.scss'],
})
export class MyListSelectorModalViewComponent {
  private _items: Array<any>
  private _selectedIndex: number
  private _title: string

  constructor(private _params: ModalDialogParams) {
    this._title = _params.context.title
    this._selectedIndex = _params.context.selectedIndex

    this._items = []
    for (let i = 0; i < _params.context.items.length; i++) {
      this._items.push({
        value: _params.context.items[i],
        isSelected: i === this._selectedIndex ? true : false,
      })
    }
  }

  onItemSelected(args): void {
    const oldSelectedItem = this._items[this._selectedIndex]
    oldSelectedItem.isSelected = false

    const newSelectedItem = this._items[args.index]
    newSelectedItem.isSelected = true
    this._selectedIndex = args.index

    this._params.closeCallback(newSelectedItem.value)
  }

  onCancelButtonTap(): void {
    this._params.closeCallback(null)
  }

  get items(): Array<any> {
    return this._items
  }

  get title(): string {
    return this._title
  }
}
