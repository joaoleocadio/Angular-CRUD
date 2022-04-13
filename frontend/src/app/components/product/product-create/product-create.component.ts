import { Produto } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public produto: Produto = {
    name: '',
    price: 0,
    id: 0
  }

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {

  }

  createProduct(): void {
    if (this.produto.name === '') {
      this.productService.showMessage("Produto Inválido!")
      throw new Error("produto inválido");
    } else {
      this.productService.create(this.produto).subscribe(() => {
        this.productService.showMessage("Produto Criado com sucesso!")
        this.route.navigate(['/products'])
      })
    }
  }

  cancel(): void {
    this.route.navigate(['/products'])
  }

}