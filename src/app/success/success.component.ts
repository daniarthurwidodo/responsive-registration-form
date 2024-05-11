import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  parameter: any = this.router.getCurrentNavigation()?.extras.state;
  constructor(private activatedRoute: ActivatedRoute, private router: Router){
  }
}
