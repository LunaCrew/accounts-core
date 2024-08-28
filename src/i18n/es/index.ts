import type { BaseTranslation } from '../i18n-types'

const es = {
  //* general *//
  hi_name: '¡Hola {name}!',

  //* correos electrónicos generales *//
  if_you_did_not_request_this_email_ignore_it: 'Si no ha creado una cuenta, ignore este correo electrónico.',
  if_you_have_any_questions: 'Si tiene alguna pregunta,',
  contact_us: 'contáctenos.',

  //* correo electrónico con código de verificación *//
  this_is_your_verification_code: 'Este es tu código de verificación, insértalo en la aplicación.',
  hi_name_here_is_your_verification_code: 'Hola {name}, aquí está su código de verificación.',
  do_not_share_this_code_with_anyone: 'No comparta este código con nadie.',

  //* texto alternativo *//
  logo_alt_text: 'Logotipo de Luna',
} satisfies BaseTranslation

export default es
