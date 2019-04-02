import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Type } from '@angular/core';
import { AbstractBaseContentBlock, ContentBlockItemType } from '@models/blocks/abstract-content-block';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as uuid from 'uuid';
import Dictionary from '../Dictionary';
import { Icon } from '../shared/icon/Icon';

export class BlocksManager {
    constructor(private readonly _contentItem: IContentEntity) {
        this.blocks = this._blocksSubject.asObservable();
        this._contentItem.blocks.forEach(block => {
            this._blocks.set(block.id, block);
        });
        this.update();
    }

    private readonly _blocks = new Dictionary<string, AbstractBaseContentBlock>();
    private readonly _blocksSubject: Subject<Array<AbstractBaseContentBlock>> = new BehaviorSubject<Array<AbstractBaseContentBlock>>(
        []
    );
    public blocks: Observable<Array<AbstractBaseContentBlock>>;

    public readonly types = new Dictionary<string, BlockConfig>();

    public update(): void {
        this._blocksSubject.next(this._blocks.values());
        this._contentItem.blocks = this._blocks.values();
    }

    private _setPositions(blocks: AbstractBaseContentBlock[]): void {
        let index = 0;

        blocks.forEach((block) => {
            block.position = index;
            index++;
        });
    }

    public addBlock(
        block: AbstractBaseContentBlock,
        neighbor: AbstractBaseContentBlock | null = null,
        direction = 'after'
    ): void {
        block.position = this._blocks.size() + 1;
        this._blocks.set(block.id, block);
        this._setPositions(this.getSorted());
        if (neighbor) {
            const toIndex = direction === 'after' ? neighbor.position + 1 : neighbor.position - 1;
            const blocks = this.getSorted();
            moveItemInArray(blocks, block.position, toIndex);
            this._setPositions(blocks);
        }
    }

    public getSorted(): AbstractBaseContentBlock[] {
        return this._blocks.values().sort((a, b) => {
            if (a.position < b.position) {
                return -1;
            }
            if (a.position > b.position) {
                return 1;
            }
            return 0;
        });
    }

    public removeBlock(block: AbstractBaseContentBlock): void {
        this._blocks.remove(block.id);
        this._setPositions(this.getSorted());
    }

    public createBlock<TBlock extends AbstractBaseContentBlock>(type: ContentBlockItemType): TBlock {
        if (!this.types.hasKey(type)) {
            throw new Error(`type ${type} is not registered!`);
        }

        const config = this.types.get(type);
        if (config) {
            const block = <TBlock>new config.typeClass();
            block.id = uuid.v4();

            return block;
        }
        throw new Error('Can\'t find block with type ' + type);
    }

    moveBlock(previousIndex: number, currentIndex: number): any {
        const blocks = this.getSorted();
        moveItemInArray(blocks, previousIndex, currentIndex);
        this._setPositions(blocks);
    }

    public replaceBlock(oldBlock: AbstractBaseContentBlock, newBlock: AbstractBaseContentBlock): void {
        newBlock.position = oldBlock.position;
        this._blocks.remove(oldBlock.id);
        this._blocks.set(newBlock.id, newBlock);
        this._setPositions(this.getSorted());
        this.update();
    }

    public registerBlockType(type: ContentBlockItemType, typeClass: Type<any>): void {
        if (this.types.hasKey(type)) {
            throw new Error(`type ${type} already registered!`);
        }

        const block = <AbstractBaseContentBlock>new typeClass();

        this.types.set(type, new BlockConfig(type, typeClass, block.title, block.icon));
    }
}

export class BlockConfig {
    constructor(
        public type: ContentBlockItemType,
        public typeClass: Type<any>,
        public title: string,
        public icon: Icon
    ) {
    }
}
