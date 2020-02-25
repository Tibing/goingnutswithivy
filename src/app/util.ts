import { ɵmarkDirty as markDirty } from '@angular/core';

export { markDirty };

export function getComponentDefinition(componentType) {
  return componentType['ɵcmp'];
}

export function getComponentFactory(componentType) {
  return componentType['ɵfac'];
}

export function setComponentFactory(componentType, factory) {
  componentType['ɵfac'] = factory;
}
