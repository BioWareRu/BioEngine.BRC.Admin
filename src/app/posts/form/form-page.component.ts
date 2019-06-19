import { Component } from '@angular/core';
import { AbstractContentEntityFormPageComponent } from '@common/forms/AbstractContentEntityFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Post } from '@models/Post';
import { PostsService } from '@services/PostsService';

@Component({
    selector: 'post-form-page',
    template: `
        <post-form class="model-form" #modelForm [model]="model"></post-form>
    `,
    providers: [PageContext]
})
export class PostFormPageComponent extends AbstractContentEntityFormPageComponent<Post, PostsService> {
    constructor(protected _postsService: PostsService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание поста';
    }

    protected _getRoute(): string {
        return '/posts';
    }

    protected _getService(): PostsService {
        return this._postsService;
    }
}
