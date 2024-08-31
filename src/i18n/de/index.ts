import type { BaseTranslation } from '../i18n-types'

const de = {
  //* allgemein *//
  hi_name: 'Hallo {name}!',
  or: 'oder',

  //* E-Mails allgemein *//
  if_you_did_not_request_this_email_ignore_it: 'Wenn Sie kein Konto erstellt haben, ignorieren Sie diese E-Mail bitte.',
  if_you_have_any_questions: 'Wenn Sie Fragen haben,',
  contact_us: 'Bitte kontaktieren Sie uns.',
  change_your_password: 'Ändern Sie Ihr Passwort.',
  for_security_reasons: 'Aus Sicherheitsgründen,',

  //* E-Mail mit Bestätigungscode *//
  this_is_your_verification_code: 'Dies ist Ihr Bestätigungscode. Geben Sie ihn in die App ein.',
  hi_name_here_is_your_verification_code: 'Hallo {name}, hier ist Ihr Bestätigungscode.',
  do_not_share_this_code_with_anyone: 'Geben Sie diesen Code an niemanden weiter.',

  //* E-Mail mit deaktiviertem Konto *//
  your_account_has_been_disabled: 'Ihr Konto wurde deaktiviert.',
  we_are_sorry_that_you_decided_to_leave: 'Es tut uns leid, dass Sie sich entschieden haben, zu gehen.',
  we_hope_that_you_come_back_soon: 'Wir hoffen, dass Sie bald zurückkommen.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'Wie gewünscht wurde Ihr Konto deaktiviert und wird in 30 Tagen gelöscht.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'Wenn Sie Ihr Konto reaktivieren möchten, melden Sie sich einfach erneut an.',
  if_you_wish_to_permanently_delete_your_account_now: 'Wenn Sie Ihr Konto jetzt dauerhaft löschen möchten.',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'Wenn Sie Ihr Konto nicht deaktiviert haben, ist Ihr Konto möglicherweise gefährdet.',

  //* E-Mail des gelöschten Kontos *//
  your_account_has_been_deleted: 'Ihr Konto wurde gelöscht.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'Von diesem Zeitpunkt an können Sie sich nicht mehr anmelden.',

  //* Alternativtext *//
  logo_alt_text: 'Luna - Logo',
} satisfies BaseTranslation

export default de
