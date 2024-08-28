import type { BaseTranslation } from '../i18n-types'

const de = {
  //* E-Mails allgemein *//
  if_you_did_not_request_this_email_ignore_it: 'Wenn Sie kein Konto erstellt haben, ignorieren Sie diese E- Mail bitte.',
  if_you_have_any_questions: 'Wenn Sie Fragen haben',
  contact_us: 'Kontaktieren Sie uns.',

  //* E-Mail mit Bestätigungscode *//
  hi_name_here_is_your_verification_code: 'Hallo {name}, hier ist Ihr Bestätigungscode.',
  please_insert_it_in_the_app: 'Bitte geben Sie ihn in die App ein.',
  do_not_share_this_code_with_anyone: 'Geben Sie diesen Code an niemanden weiter.',

  //* Alternativtext *//
  logo_alt_text: 'Luna - Logo',
} satisfies BaseTranslation

export default de
