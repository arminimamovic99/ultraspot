import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  showSuccessLogin = false;

  ngOnInit() {
    this.route.params.pipe(
      tap((res) => {
        console.log({res});
      })
    ).subscribe();
  }
  navigate() {
    this.router.navigate(['order'], {queryParams: {loginSuccess: true} });
  }
}
