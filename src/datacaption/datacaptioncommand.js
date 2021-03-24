import { Command } from 'ckeditor5/src/core';
import { isCaptionable } from '../utils';

export default class DataCaptionCommand extends Command {
  refresh() {
    const element = this.editor.model.document.selection.getSelectedElement();

    this.isEnabled = isCaptionable(element);

    if (this.isEnabled && element.hasAttribute('data-caption')) {
      this.value = element.getAttribute('data-caption');
    } else {
      this.value = false;
    }
  }

  execute(options) {
    const { model } = this.editor;
    const element = model.document.selection.getSelectedElement();

    model.change((writer) => {
      writer.setAttribute('data-caption', options.newValue, element);
    });
  }
}
