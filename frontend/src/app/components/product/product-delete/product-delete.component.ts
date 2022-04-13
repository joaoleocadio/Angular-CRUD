import { Produto } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  produto: Produto = {
    name: '', price: 0, id: 0
  }
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if (id === null) {
      return null as any
    } else {
      this.productService.readByID(id).subscribe(product => {
        this.produto = product
      })

    }
  }

  deleteProduct(): void{
    this.productService.delete(`${this.produto.id}`).subscribe(() =>
    this.productService.showMessage("Produto Eliminado com sucesso!"))
    this.router.navigate(["/products"])
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }

}
