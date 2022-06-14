import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = '';
  constructor(private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe((params => {
      if (params['search']) this.search = params['search'];
    }))
  }

  onSearch(search: string):void {
    if (search) this.router.navigate(['search', search]);
  }

}
