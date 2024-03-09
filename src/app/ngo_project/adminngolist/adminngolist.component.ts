import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Ngo } from '../../models/Ngo';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgoserviceService } from '../../services/ngoservice.service';
declare const myNgoscript:any;

@Component({
  selector: 'app-adminngolist',
  templateUrl: './adminngolist.component.html',
  styleUrl: './adminngolist.component.css'
})
export class AdminngolistComponent {


  mytablescripy()
  {
    myNgoscript();
  }
   
delete()
{
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}


selectedNgo: Ngo | null = null; // Hold the selected NGO details
click: boolean = true;
public ngos: Observable<Ngo[]> = of([]);
totalExpenditureAmount: number = 0;

constructor(private service: NgoserviceService, private router: Router) {}

ngOnInit() {
  this.getAll();
}

getAll() {
  this.ngos = this.service.getAllNgo();
}

showDetails(ngo: Ngo): void {
  this.click = false;
  this.selectedNgo = ngo;
  this.calculateTotalExpenditure(); // Calculate total expenditure when NGO details are shown
}

goBack(): void {
  this.selectedNgo = null;
  this.click = true;
}

calculateTotalExpenditure() {
  if (this.selectedNgo) {
    this.totalExpenditureAmount = this.selectedNgo.expenditures.reduce((total, e) => total + e.exp_amount, 0);
  }
}


 deleteNgo(id:any){
 return this.service.deleteNgo(id).subscribe((data)=>{
  console.log(data);
  this.getAll();
 })
 }

//  ngoDetails(id:number){
//   this.router.navigate(['details', id]);
//  }

 

}
