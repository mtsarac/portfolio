import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import tr from '../i18n/translations/tr.json'
import en from '../i18n/translations/en.json'
import { experiences, type InternshipExperience } from './experienceData'

const publicDir = fileURLToPath(new URL('../../../public', import.meta.url))

function hasKey(obj: Record<string, unknown>, path: string): boolean {
  let current: unknown = obj
  for (const key of path.split('.')) {
    if (!current || typeof current !== 'object' || !(key in current)) return false
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string'
}

function translationKeysOf(experience: InternshipExperience): string[] {
  return [
    experience.companyKey,
    experience.departmentKey,
    experience.programKey,
    experience.periodKey,
    experience.locationKey,
    experience.descriptionKey,
    ...experience.highlights.flatMap((highlight) => [highlight.titleKey, highlight.descKey]),
    ...experience.documents.map((document) => document.labelKey),
  ].filter((key): key is string => Boolean(key))
}

describe('experiences', () => {
  it('have unique ids', () => {
    const ids = experiences.map((experience) => experience.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('reference translation keys that exist in both languages', () => {
    const missing = experiences.flatMap((experience) =>
      translationKeysOf(experience).flatMap((key) =>
        [tr, en].some((dict) => !hasKey(dict, key)) ? [`${experience.id}: ${key}`] : [],
      ),
    )

    expect(missing).toEqual([])
  })

  it('link only to documents that exist in public/', () => {
    const missing = experiences.flatMap((experience) =>
      experience.documents.flatMap((document) =>
        existsSync(`${publicDir}${document.href}`) ? [] : [`${experience.id}: ${document.href}`],
      ),
    )

    expect(missing).toEqual([])
  })
})
