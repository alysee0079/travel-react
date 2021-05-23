export const CHANGE_LANGUAGE = 'change_language'
export const ADD_LANGUAGE = 'add_language'

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE
  payload: 'en' | 'zh'
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE
  payload: {
    name: string
    code: string
  }
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction

export const changeLanguageCreator = (languageCode: 'en' | 'zh'): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  }
}

export const addLanguageCreator = (name: string, code: string): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  }
}
