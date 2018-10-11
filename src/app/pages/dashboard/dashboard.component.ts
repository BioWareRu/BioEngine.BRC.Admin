import {Component} from '@angular/core';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {Observable} from 'rxjs/Observable';
import 'rxjs-compat/add/observable/forkJoin';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  public sitesCount = 0;
  public sectionsCount = 0;
  public developersCount = 0;
  public gamesCount = 0;
  public topicsCount = 0;
  public postsCount = 0;
  public galleryCount = 0;
  public filesCount = 0;

  constructor(private servicesProvider: ServicesProvider) {
    Observable.forkJoin(
      this.servicesProvider.SitesService.count(),
      this.servicesProvider.SectionsService.count(),
      this.servicesProvider.DevelopersService.count(),
      this.servicesProvider.GamesService.count(),
      this.servicesProvider.PostsService.count(),
      this.servicesProvider.TopicsService.count(),
    ).subscribe(res => {
      this.sitesCount = res[0];
      this.sectionsCount = res[1];
      this.developersCount = res[2];
      this.gamesCount = res[3];
      this.postsCount = res[4];
      this.topicsCount = res[5];
    });
  }
}
