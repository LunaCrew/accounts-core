import type { BaseTranslation } from '../i18n-types'

const ru = {
  //* общие письма *//
  if_you_did_not_request_this_email_ignore_it: 'Если вы не создавали учетную запись, проигнорируйте это письмо.',
  if_you_have_any_questions: 'Если у вас есть вопросы,',
  contact_us: 'свяжитесь с нами.',

  //* письмо с кодом подтверждения *//
  hi_name_here_is_your_verification_code: 'Привет, {name}, вот ваш код подтверждения.',
  please_insert_it_in_the_app: 'Пожалуйста, вставьте его в приложение.',
  do_not_share_this_code_with_anyone: 'Не делитесь этим кодом ни с кем.',

  //* alt text *//
  logo_alt_text: 'Логотип Luna',
} satisfies BaseTranslation

export default ru
