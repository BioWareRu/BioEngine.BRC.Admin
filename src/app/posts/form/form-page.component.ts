import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from '@common/forms/abstract-form-component';
import { PageContext } from '@common/abstract-page-component';
import { Post } from '@models/posts/Post';
import { SavePostResponse } from '@models/results/Post';
import { PostsService } from '@services/ContentService';

@Component({
    selector: 'post-form-page',
    template: `
        <post-form class="model-form" #modelForm [model]="model"></post-form>
    `,
    providers: [PageContext]
})
export class PostFormPageComponent extends AbstractFormPageComponent<Post, SavePostResponse> {
    constructor(protected _postsService: PostsService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание поста';
    }

    protected _getRoute(): string {
        return '/posts';
    }

    protected _getService(): AbstractBaseService<Post> {
        return this._postsService;
    }
}
