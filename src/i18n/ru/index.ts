import type { BaseTranslation } from '../i18n-types'

const ru = {
  //* общее *//
  hi_name: 'Привет {name:string}!',

  //* общие письма *//
  if_you_did_not_request_this_email_ignore_it: 'Если вы не создавали учетную запись, проигнорируйте это письмо.',
  if_you_have_any_questions: 'Если у вас есть вопросы,',
  contact_us: 'свяжитесь с нами.',

  //* письмо с кодом подтверждения *//
  this_is_your_verification_code: 'Это ваш код подтверждения, введите его в приложение.',
  hi_name_here_is_your_verification_code: 'Привет, {name}, вот ваш код подтверждения.',
  do_not_share_this_code_with_anyone: 'Не делитесь этим кодом ни с кем.',

  //* alt text *//
  logo_alt_text: 'Логотип Luna',
} satisfies BaseTranslation

export default ru
