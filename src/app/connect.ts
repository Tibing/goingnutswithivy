import { ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { ActionCreator, Store } from '@ngrx/store';

export interface ConnectOptions {
  inputs: { [key: string]: string };
  outputs: { [key: string]: ActionCreator };
}

export function Connect(options: ConnectOptions) {
  return (componentType) => {
    const definition = componentType['ɵcmp'];

    const factory = componentType['ɵfac'];

    componentType['ɵfac'] = (...args) => {
      const instance = factory(...args);
      const store: Store<any> = directiveInject(Store);

      for (const prop in options.inputs) {
        const input = options.inputs[prop];
        store.select(input).subscribe(val => instance[prop] = val);
      }

      for (const prop in options.outputs) {
        const output = options.outputs[prop];
        // @ts-ignore
        instance[prop].subscribe(val => store.dispatch(output()));
      }

      return instance;
    };
    return componentType;
  };
}
