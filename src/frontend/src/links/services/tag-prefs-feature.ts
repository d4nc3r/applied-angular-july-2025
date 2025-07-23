import { signalStoreFeature, withState } from '@ngrx/signals';

type TagPrefsState = {
  ignoredTags: string[];
  watchedTags: string[];
};

export function withTagPrefs() {
  return signalStoreFeature(
    withState<TagPrefsState>({
      ignoredTags: [],
      watchedTags: [],
    }),
  );
}

export function addWatchedTag(
  watchedTags: string[],
  tag: string,
): Partial<TagPrefsState> {
  // TODO: only add tag if it's not already there (use a Set?)
  return { watchedTags: [...watchedTags, tag] };
}

export function removeWatchedTag(
  watchedTags: string[],
  tag: string,
): Partial<TagPrefsState> {
  return { watchedTags: watchedTags.filter((t) => t !== tag) };
}

export function addIgnoredTag(
  ignoredTags: string[],
  tag: string,
): Partial<TagPrefsState> {
  // TODO: only add tag if it's not already there (use a Set?)
  return { ignoredTags: [...ignoredTags, tag] };
}

export function removeIgnoredTag(
  ignoredTags: string[],
  tag: string,
): Partial<TagPrefsState> {
  return { ignoredTags: ignoredTags.filter((t) => t !== tag) };
}
