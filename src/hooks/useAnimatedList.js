/* eslint-disable function-paren-newline */
import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((itemId) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, itemId]);
  }, []);

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prevState) => prevState.filter(({ id }) => id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemId));
  }, []);

  const geAnimatedRef = useCallback((itemId) => {
    const animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      const createdRef = createRef();
      animatedRefs.current.set(itemId, createdRef);
      return createdRef;
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = geAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      }),
    [items, pendingRemovalItemsIds, geAnimatedRef],
  );

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (alreadyHasListener || !animatedElement) {
        return;
      }

      const onAnimationEnd = () => handleAnimationEnd(itemId);
      const removeListener = () =>
        animatedElement.removeEventListener('animationend', onAnimationEnd);

      animatedElement.addEventListener('animationend', onAnimationEnd);
      animationEndListeners.current.set(itemId, removeListener);
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
