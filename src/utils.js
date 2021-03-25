import { BalloonPanelView } from 'ckeditor5/src/ui';

export function isBlockImage(modelElement) {
  return !!modelElement && modelElement.is('element', 'image');
}

export function isInlineImage(modelElement) {
  return !!modelElement && modelElement.is('element', 'imageInline');
}

/**
 * This will eventually also check for drupalMedia.
 */
export function isCaptionable(modelElement) {
  return isInlineImage(modelElement) || isBlockImage(modelElement);
}

export function getSelectedWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement) {
    return viewElement;
  }

  return null;
}

export function getBalloonPositionData(editor) {
  const editingView = editor.editing.view;
  const defaultPositions = BalloonPanelView.defaultPositions;

  return {
    target: editingView.domConverter.viewToDom(
      editingView.document.selection.getSelectedElement(),
    ),
    positions: [
      defaultPositions.northArrowSouth,
      defaultPositions.northArrowSouthWest,
      defaultPositions.northArrowSouthEast,
      defaultPositions.southArrowNorth,
      defaultPositions.southArrowNorthWest,
      defaultPositions.southArrowNorthEast,
    ],
  };
}

export function repositionContextualBalloon(editor) {
  const balloon = editor.plugins.get('ContextualBalloon');

  if (getSelectedWidget(editor.editing.view.document.selection)) {
    const position = getBalloonPositionData(editor);

    balloon.updatePosition(position);
  }
}

export function getViewImageFromWidget(figureView) {
  if (figureView.is('element', 'img')) {
    return figureView;
  }

  const figureChildren = [];

  for (const figureChild of figureView.getChildren()) {
    figureChildren.push(figureChild);

    if (figureChild.is('element')) {
      figureChildren.push(...figureChild.getChildren());
    }
  }

  return figureChildren.find((viewChild) => viewChild.is('element', 'img'));
}
