import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
result:any
products: any=[]
constructor(private data:ProductserviceService){}

  ngOnInit(){
   this.data.getData().subscribe((product)=>{
    console.log(product);
    this.result=product
    console.log(this.result);
     this.getProducts();
   }) 
  }

  //get products
  getProducts() {
    this.data.getData().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // add products
    addProduct() {
      const userIdInput = prompt('Enter the userId');
      const idInput = prompt('Enter the id');
      const userId = userIdInput !== null ? parseInt(userIdInput, 10) : 0;
      const id = idInput !== null ? parseInt(idInput, 10) : 0;
      const title = prompt('Enter the title');
      const body = prompt('Enter the body');
      if (userId && id && title && body) {
        this.data.createProduct({ userId, id, title, body }).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
          },
          (error) => {
            console.error('Failed to add the product:', error);
          }
        );
      }
    }
  
  
 //Delete the products
  deleteData(id: number){
    this.data.deleteProduct(id)
      .subscribe(() => {});
  }

  //Edit the products
  editProduct(id: number) {
    const product = this.products.find((p:any) => p.id === id);
    if (product) {
      const newTitle = prompt('Enter the new title:', product.title);
      const newBody=prompt("enter the details",product.body)
      if (newTitle && newBody!== null) {
        const newProduct = { ...product, title: newTitle, body:newBody};
        this.data.updateProduct(id, newProduct).subscribe(
          () => {
            this.getProducts();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }
}

 

