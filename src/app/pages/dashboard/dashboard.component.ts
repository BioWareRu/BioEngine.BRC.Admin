import {Component} from '@angular/core';
import {ServicesProvider} from "../../@services/ServicesProvider";
import {Observable} from "rxjs/Observable";
import "rxjs-compat/add/observable/forkJoin";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  protected sitesCount = 0;
  protected sectionsCount = 0;
  protected developersCount = 0;
  protected gamesCount = 0;
  protected topicsCount = 0;
  protected postsCount = 0;
  protected galleryCount = 0;
  protected filesCount = 0;

  constructor(private servicesProvider: ServicesProvider) {
    Observable.forkJoin(
      this.servicesProvider.SitesService.count(),
      this.servicesProvider.SectionsService.count(),
      this.servicesProvider.DevelopersService.count(),
      this.servicesProvider.GamesService.count(),
      this.servicesProvider.PostsService.count(),
      //this.servicesProvider.TopicsService.count(),
    ).subscribe(res => {
      this.sitesCount = res[0];
      this.sectionsCount = res[1];
      this.developersCount = res[2];
      this.gamesCount = res[3];
      this.postsCount = res[4];
    });
  }
}
