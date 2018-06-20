import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://github.com/sonicgd" target="_blank">Sonic</a></b> in 2018</span>
    <div class="socials">
      <a href="https://github.com/biowareru" target="_blank" class="icon ion-logo-github"></a>
      <a href="https://www.facebook.com/biowareru/" target="_blank" class="icon ion-logo-facebook"></a>
      <a href="https://twitter.com/biowareru" target="_blank" class="icon ion-logo-twitter"></a>
      <a href="#" target="_blank" class="icon ion-logo-vk"></a>
    </div>
  `,
})
export class FooterComponent {
}
