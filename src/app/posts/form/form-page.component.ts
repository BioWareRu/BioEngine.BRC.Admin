import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { Component } from '@angular/core';
import { TopicsService } from 'app/@services/TopicsService';
import { Topic } from 'app/@models/Topic';
import { SaveTopicResponse } from 'app/@models/results/Topic';
import { Post } from 'app/@models/posts/Post';
import { SavePostResponse } from 'app/@models/results/Post';
import { PostsService } from 'app/@services/ContentService';

@Component({
    selector: 'post-form-page',
    template: `
        <post-form class="model-form" #modelForm [model]="Model"></post-form>
    `,
    providers: [PageContext]
})
export class PostFormPageComponent extends FormPageComponent<Post, SavePostResponse> {
    constructor(context: PageContext, protected postsService: PostsService) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание поста';
    }

    protected getRoute(): string {
        return '/content/list/posts';
    }

    protected getService(): BaseService<Post> {
        return this.postsService;
    }
}
