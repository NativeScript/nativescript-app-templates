import { Component, NO_ERRORS_SCHEMA, OnInit, inject, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-item-detail',
  templateUrl: './item-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ItemDetailComponent implements OnInit {
  itemService = inject(ItemService)
  route = inject(ActivatedRoute)
  item = signal<Item>(null)

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id
    this.item.set(this.itemService.getItem(id))

    // log the item to the console
    console.log(this.item())
  }
}
