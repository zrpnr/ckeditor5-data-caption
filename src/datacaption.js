import { Plugin } from 'ckeditor5/src/core';

import DataCaptionEditing from './datacaption/datacaptionediting';
import DataCaptionUI from './datacaption/datacaptionui';
export default class DataCaption extends Plugin {
  static get requires() {
    return [DataCaptionEditing, DataCaptionUI];
  }

  static get pluginName() {
    return 'DataCaption';
  }
}
