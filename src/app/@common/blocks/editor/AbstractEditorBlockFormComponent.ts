import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { AbstractContentBlockFormComponent } from '@common/blocks/editor/AbstractContentBlockFormComponent';
import { AbstractBaseContentBlock } from '@models/base/AbstractBaseContentBlock';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

export abstract class AbstractEditorBlockFormComponent<TBlock extends AbstractBaseContentBlock> extends AbstractContentBlockFormComponent<TBlock> {
    public editorInstance = BalloonEditor;

    // noinspection JSMethodCanBeStatic
    public get editorConfig(): CKEditor5.Config {
        return {
            removePlugins: [
                'UploadAdapter',
                'CKFinder',
                'EasyImage',
                'BlockQuote',
                'MediaEmbed',
                'Table',
                'TableToolbar',
                'Image',
                'ImageCaption',
                'ImageStyle',
                'ImageToolbar',
                'ImageUpload'],
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'undo',
                    'redo'
                ]
            }
        };
    }
}
