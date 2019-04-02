import { AbstractSection, AbstractTypedData } from './abstract-section';

export class TopicData extends AbstractTypedData {
}

export class Topic extends AbstractSection<TopicData> {
  data: TopicData;
}
