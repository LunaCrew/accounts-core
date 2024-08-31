import type { BaseTranslation } from '../i18n-types'

const es = {
  //* general *//
  hi_name: '¡Hola {name}!',
  or: 'o',

  //* correos electrónicos general *//
  if_you_did_not_request_this_email_ignore_it: 'Si no has creado una cuenta, ignora este correo electrónico.',
  if_you_have_any_questions: 'Si tienes alguna pregunta,',
  contact_us: 'Contáctanos.',
  change_your_password: 'Cambia tu contraseña.',
  for_security_reasons: 'Por razones de seguridad,',

  //* correo electrónico con código de verificación *//
  this_is_your_verification_code: 'Este es tu código de verificación, introdúcelo en la aplicación.',
  hi_name_here_is_your_verification_code: 'Hola {name}, aquí está tu código de verificación.',
  do_not_share_this_code_with_anyone: 'No compartas este código con nadie.',

  //* correo electrónico con cuenta deshabilitada *//
  your_account_has_been_disabled: 'Su cuenta ha sido deshabilitada.',
  we_are_sorry_that_you_decided_to_leave: 'Lamentamos que haya decidido irse.',
  we_hope_that_you_come_back_soon: 'Esperamos que vuelva pronto.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'Como lo solicitó, su cuenta ha sido deshabilitada y se eliminará en 30 días.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'Si desea reactivar su cuenta, simplemente inicie sesión nuevamente.',
  if_you_wish_to_permanently_delete_your_account_now: 'Si desea eliminar permanentemente su cuenta ahora,',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'Si no desactivó su cuenta, su cuenta podría estar en riesgo.',

  //* correo electrónico de cuenta eliminada *//
  your_account_has_been_deleted: 'Su cuenta ha sido eliminada.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'A partir de este momento, ya no podrá iniciar sesión.',

  //* texto alternativo *//
  logo_alt_text: 'Logotipo de Luna',
} satisfies BaseTranslation

export default es
