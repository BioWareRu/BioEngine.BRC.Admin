import { KeyedCollection } from 'app/@common/KeyedCollection';
import { Post, PostBlock, BasePostBlock, ContentBlockItemType } from 'app/@models/Post';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogService } from '../modals/DialogService';
import { Type } from '@angular/core';
import { IKeyedCollection } from '../KeyedCollection';
import * as uuid from 'uuid';
export class BlocksManager {
    constructor(private post: Post, private _dialogService: DialogService) {
        this._blocks = post.Blocks;
        this.Blocks = this.BlocksSubject.asObservable();
        this.Update();
    }

    private _blocks: BasePostBlock[] = [];
    private BlocksSubject: Subject<BasePostBlock[]> = new BehaviorSubject<BasePostBlock[]>([]);
    public Blocks: Observable<BasePostBlock[]>;

    public readonly Types: IKeyedCollection<BlockConfig, string> = new KeyedCollection<
        BlockConfig
    >();

    public Update(): void {
        this.BlocksSubject.next(this._blocks.slice());
        this.post.Blocks = this._blocks;
    }

    private SetPositions(): void {
        let index = 0;

        this._blocks.forEach(block => {
            block.Position = index;
            index++;
        });
    }

    public AddBlock(
        block: BasePostBlock,
        neighbor: BasePostBlock = null,
        direction = 'after'
    ): void {
        this._blocks.push(block);
        this.SetPositions();
        if (neighbor) {
            const toIndex = direction === 'after' ? neighbor.Position + 1 : neighbor.Position - 1;
            moveItemInArray(this._blocks, block.Position, toIndex);
            this.SetPositions();
        }
        if (block.Id === this.Last().Id && block.Type !== ContentBlockItemType.Text) {
            this.AddBlock(this.CreateBlock(ContentBlockItemType.Text));
        }
    }

    public RemoveBlock(block: BasePostBlock): void {
        this._blocks.splice(block.Position, 1);
        this.SetPositions();
    }

    public CreateBlock<TBlock extends BasePostBlock>(type: ContentBlockItemType): TBlock {
        if (!this.Types.ContainsKey(type)) {
            throw new Error(`type ${type} is not registered!`);
        }

        const config = this.Types.Item(type);
        const block = new config.typeClass() as TBlock;
        block.Id = uuid.v4();
        return block as TBlock;
    }

    MoveBlock(previousIndex: number, currentIndex: number): any {
        moveItemInArray(this._blocks, previousIndex, currentIndex);
        this.SetPositions();
    }

    public ReplaceBlock(oldBlock: BasePostBlock, newBlock: BasePostBlock): void {
        this._blocks[oldBlock.Position] = newBlock;
        this.SetPositions();
        if (newBlock.Id === this.Last().Id && newBlock.Type !== ContentBlockItemType.Text) {
            this.AddBlock(this.CreateBlock(ContentBlockItemType.Text));
        }
        this.Update();
    }

    public RegisterBlockType(type: ContentBlockItemType, typeClass: Type<any>): void {
        if (this.Types.ContainsKey(type)) {
            throw new Error(`type ${type} already registered!`);
        }

        const block = new typeClass() as BasePostBlock;

        this.Types.Add(type, new BlockConfig(type, typeClass, block.Title, block.Icon));
    }

    public First(): BasePostBlock {
        for (const i in this._blocks) {
            if (this._blocks.hasOwnProperty(i)) {
                return this._blocks[i];
            }
        }
    }
    public Last(): BasePostBlock {
        let item: BasePostBlock;
        const sorted = this._blocks.sort((a, b) => {
            return a.Position - b.Position;
        });
        for (const i in sorted) {
            if (sorted.hasOwnProperty(i)) {
                item = sorted[i];
            }
        }
        return item;
    }
}

export class BlockConfig {
    constructor(
        public type: ContentBlockItemType,
        public typeClass: Type<any>,
        public title: string,
        public icon: string
    ) {}
}
