import React from 'react';

import {
  composeHooks,
  createElemPropsHook,
  createSubModelElemPropsHook,
  createSubcomponent,
} from '@workday/canvas-kit-react/common';
import {useListItemRegister, useListItemRovingFocus} from '@workday/canvas-kit-react/collection';
import {Pill} from '@workday/canvas-kit-preview-react/pill';

import {useMultiSelectItemRemove} from './useMultiSelectItemRemove';
import {useMultiSelectModel} from './useMultiSelectModel';

export interface MultiSelectedItemProps {
  /**
   * Remove label on a MultiSelectedItem. In English, the label may be "Remove" and the screen
   * reader will read out "Remove {option}".
   *
   * @default "remove"
   */
  removeLabel?: string;
}

export const useMultiSelectedItem = composeHooks(
  createElemPropsHook(useMultiSelectModel)(model => {
    return {
      'aria-selected': true,
    };
  }),
  useMultiSelectItemRemove,
  createSubModelElemPropsHook(useMultiSelectModel)(m => m.selected, useListItemRovingFocus),
  createSubModelElemPropsHook(useMultiSelectModel)(m => m.selected, useListItemRegister)
);

export const MultiSelectedItem = createSubcomponent('span')({
  modelHook: useMultiSelectModel,
  elemPropsHook: useMultiSelectedItem,
})<MultiSelectedItemProps>(({children, removeLabel, ref, ...elemProps}, Element) => {
  return (
    <Pill as={Element} variant="removable">
      {children}
      <Pill.IconButton aria-label={removeLabel} ref={ref} {...(elemProps as any)} />
    </Pill>
  );
});