import { AbstractContentBlockData } from '../base/AbstractContentBlockData';
export class TwitterBlockData extends AbstractContentBlockData {
    public tweetId: string | null = null;
    public tweetAuthor: string | null = null;
    public tweetUrl = '';
}
