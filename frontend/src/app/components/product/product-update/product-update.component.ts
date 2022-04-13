import { Produto } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  produto: Produto = {
    name: '', price: 0, id: 0
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //Permite obter o parâmetro através da rota

    if (id === null) {
      return null as any
    } else {
      this.productService.readByID(id).subscribe(product => {
        this.produto = product
      });
    }
  }

  updateProduct(): void {
    this.productService.update(this.produto).subscribe(() => {
      this.productService.showMessage('Produto alterado com sucesso!')
      this.router.navigate(["/products"])
    }) 

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
