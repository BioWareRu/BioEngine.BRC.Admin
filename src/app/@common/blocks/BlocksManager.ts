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

    private _types: IKeyedCollection<Type<any>> = new KeyedCollection<Type<any>>();

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
    }

    public RemoveBlock(block: BasePostBlock): void {
        this._blocks.splice(block.Position, 1);
        this.SetPositions();
    }

    public CreateBlock<TBlock extends BasePostBlock>(type: ContentBlockItemType): TBlock {
        if (!this._types.ContainsKey(type)) {
            throw new Error(`type ${type} is not registered!`);
        }

        const typeClass = this._types.Item(type);
        const block = new typeClass() as TBlock;
        block.Id = uuid.v4();
        return block as TBlock;
    }

    MoveBlock(previousIndex: number, currentIndex: number): any {
        moveItemInArray(this._blocks, previousIndex, currentIndex);
        this.SetPositions();
    }

    public RegisterBlockType(type: ContentBlockItemType, typeClass: Type<any>): void {
        if (this._types.ContainsKey(type)) {
            throw new Error(`type ${type} already registered!`);
        }

        this._types.Add(type, typeClass);
    }
}
