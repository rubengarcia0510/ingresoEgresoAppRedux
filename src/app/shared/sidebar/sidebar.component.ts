import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() usuario:string | undefined

  constructor(private authService:AuthService,
              private route:Router){

  }

  logout(){
    this.authService.logouUsusario()
        .then( ()=>{
          this.route.navigate(['/login']);
        }
          
        )
  }

}
