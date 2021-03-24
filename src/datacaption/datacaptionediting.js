import { Plugin } from 'ckeditor5/src/core';

import { enablePlaceholder } from 'ckeditor5/src/engine';
import { toWidgetEditable } from 'ckeditor5/src/widget';

import DataCaptionCommand from './datacaptioncommand';

export default class DataCaptionEditing extends Plugin {
  static get pluginName() {
    return 'DataCaptionEditing';
  }

  init() {
    const editor = this.editor;
    const schema = editor.model.schema;
    const t = editor.t;

    if (schema.isRegistered('imageInline')) {
      schema.extend('imageInline', {
        allowAttributes: ['data-caption'],
      });
    }

    editor.conversion.for('upcast').attributeToAttribute({
      view: 'data-caption',
      model: 'data-caption',
    });

    editor.conversion.for('dataDowncast').attributeToAttribute({
      view: 'data-caption',
      model: 'data-caption',
    });

    this.editor.commands.add(
      'dataCaption',
      new DataCaptionCommand(this.editor),
    );
  }
}
