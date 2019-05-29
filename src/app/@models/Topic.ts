import { AbstractSection } from './abstract-section';
import { TopicData } from './TopicData';

export class Topic extends AbstractSection<TopicData> {
  data: TopicData;
}
