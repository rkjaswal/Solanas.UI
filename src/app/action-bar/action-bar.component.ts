import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})

export class ActionBarComponent implements OnInit {
  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  onHome() {
    this.router.navigate(['/home']);
  }
  
  onFullMenu() {
    this.router.navigate(['/menu']);
  }
}
