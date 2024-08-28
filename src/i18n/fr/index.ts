import type { BaseTranslation } from '../i18n-types'

const fr = {
  //* général *//
  hi_name: 'Salut {name} !',

  //* emails généraux *//
  if_you_did_not_request_this_email_ignore_it: 'Si vous n\'avez pas créé de compte, veuillez ignorer cet e- mail.',
  if_you_have_any_questions: 'Si vous avez des questions,',
  contact_us: 'contactez-nous.',

  //* email de code de vérification *//
  this_is_your_verification_code: 'Ceci est votre code de vérification, insérez-le dans l\'application.',
  hi_name_here_is_your_verification_code: 'Bonjour {name}, voici votre code de vérification.',
  please_insert_it_in_the_app: 'Veuillez l\'insérer dans l\'application.',
  do_not_share_this_code_with_anyone: 'Ne partagez ce code avec personne.',

  //* texte alternatif *//
  logo_alt_text: 'Logo Luna',
} satisfies BaseTranslation

export default fr
