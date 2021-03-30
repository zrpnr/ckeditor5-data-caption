import { Plugin } from 'ckeditor5/src/core';

import DataCaptionCommand from './datacaptioncommand';
export default class DataCaptionEditing extends Plugin {
  static get pluginName() {
    return 'DataCaptionEditing';
  }

  init() {
    this.editor.commands.add(
      'dataCaption',
      new DataCaptionCommand(this.editor),
    );
  }
}
