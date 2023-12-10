import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction('[shared state] set loading spinner', props<{status: boolean}>());

export const setErrorMessage = createAction(
  '[shared state] set error message', props<{message: string}>()
)
