// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'pt_br'

export type Locales =
	| 'en_us'
	| 'pt_br'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * O​l​á​ ​{​n​a​m​e​}​!
	 * @param {unknown} name
	 */
	HI: RequiredParams<'name'>
}

export type TranslationFunctions = {
	/**
	 * Olá {name}!
	 */
	HI: (arg: { name: unknown }) => LocalizedString
}

export type Formatters = {}
