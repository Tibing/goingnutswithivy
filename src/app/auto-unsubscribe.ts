export function AutoUnsubscribe<T>(componentType: T) {
  const definition = componentType['ɵcmp'];
  const onDestroy = definition.onDestroy;

  const factory = componentType['ɵfac'];

  let instance;

  componentType['ɵfac'] = (...args) => {
    instance = factory(...args);
    return instance;
  };

  definition.onDestroy = () => {
    if (onDestroy) {
      onDestroy.call(instance);
    }

    for (const prop in instance) {
      const property = instance[prop];
      if (property && property.unsubscribe) {
        property.unsubscribe();
      }
    }
  };

  return componentType;
}
