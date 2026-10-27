export const STORAGE_KEY = 'gallery_favourites';

export const ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

export const initialFavourites = [];

export function initFavourites(initial = initialFavourites) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initial;
  } catch {
    return initial;
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_FAVOURITE: {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((item) => item !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}
