import { atom } from 'jotai';

export type FoodIdentity = { code: string; name: string, sequence: number };

export const foodIdentityAtom = atom<FoodIdentity>({ code: '', name: '', sequence: 0 });

// Action atom, code + name parallel
export const setFoodIdentityAtom = atom(
  null,
  (get, set, next: Partial<FoodIdentity>) => {
    const prev = get(foodIdentityAtom);
    set(foodIdentityAtom, { ...prev, ...next });
  }
);

/** Write-only action: mark name as edited by user */
export const markFoodNameDirtyAtom = atom(null, (_get, set) => {
  set(foodNameDirtyAtom, true);
});

/** Write-only action: clear dirty when switching to another food item */
export const clearFoodNameDirtyAtom = atom(null, (_get, set) => {
  set(foodNameDirtyAtom, false);
});

// Flag user know edit name or not
export const foodNameDirtyAtom = atom<boolean>(false);
