/* eslint-disable function-paren-newline */
import { useCallback, useState } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((itemId) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, itemId]);
  }, []);

  const handleAnimationEnd = useCallback((itemId) => {
    setItems((prevState) => prevState.filter(({ id }) => id !== itemId));
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemId));
  }, []);

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) =>
        renderItem(item, { isLeaving: pendingRemovalItemsIds.includes(item.id) }),
      ),
    [items, pendingRemovalItemsIds],
  );

  return {
    items,
    setItems,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  };
}
