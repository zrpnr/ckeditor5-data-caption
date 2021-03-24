import {
  ButtonView,
  FocusCycler,
  LabeledFieldView,
  View,
  ViewCollection,
  createLabeledInputText,
  injectCssTransitionDisabler,
  submitHandler,
} from 'ckeditor5/src/ui';
import { FocusTracker, KeystrokeHandler } from 'ckeditor5/src/utils';
import { icons } from 'ckeditor5/src/core';

export default class TextAlternativeFormView extends View {
  constructor(locale) {
    super(locale);

    const { t } = this.locale;

    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();

    this.labeledInput = this._createLabeledInputView();

    this.saveButtonView = this._createButton(
      t('Save'),
      icons.check,
      'ck-button-save',
    );
    this.saveButtonView.type = 'submit';
    this.cancelButtonView = this._createButton(
      t('Cancel'),
      icons.cancel,
      'ck-button-cancel',
      'cancel',
    );

    this._focusables = new ViewCollection();

    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: 'shift + tab',

        // Navigate form fields forwards using the Tab key.
        focusNext: 'tab',
      },
    });

    this.setTemplate({
      tag: 'form',

      attributes: {
        class: ['ck', 'ck-caption-form', 'ck-responsive-form'],

        // https://github.com/ckeditor/ckeditor5-image/issues/40
        tabindex: '-1',
      },

      children: [this.labeledInput, this.saveButtonView, this.cancelButtonView],
    });

    injectCssTransitionDisabler(this);
  }

  render() {
    super.render();

    this.keystrokes.listenTo(this.element);

    submitHandler({ view: this });

    [this.labeledInput, this.saveButtonView, this.cancelButtonView].forEach(
      (v) => {
        // Register the view as focusable.
        this._focusables.add(v);

        // Register the view in the focus tracker.
        this.focusTracker.add(v.element);
      },
    );
  }

  _createButton(label, icon, className, eventName) {
    const button = new ButtonView(this.locale);

    button.set({
      label,
      icon,
      tooltip: true,
    });

    button.extendTemplate({
      attributes: {
        class: className,
      },
    });

    if (eventName) {
      button.delegate('execute').to(this, eventName);
    }

    return button;
  }

  _createLabeledInputView() {
    const { t } = this.locale;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText,
    );

    labeledInput.label = t('Caption');

    return labeledInput;
  }
}
