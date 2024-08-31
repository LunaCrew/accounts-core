import type { BaseTranslation } from '../i18n-types'

const ru = {
  //* общие *//
  hi_name: 'Привет, {name}!',
  или: 'или',

  //* общие письма *//
  if_you_did_not_request_this_email_ignore_it: 'Если вы не создавали учетную запись, проигнорируйте это письмо.',
  if_you_have_any_questions: 'Если у вас есть вопросы,',
  contact_us: 'пожалуйста, свяжитесь с нами.',
  change_your_password: 'измените свой пароль.',
  for_security_reasons: 'В целях безопасности,',

  //* электронное письмо с кодом подтверждения *//
  this_is_your_verification_code: 'Это ваш код подтверждения, введите его в приложение.',
  hi_name_here_is_your_verification_code: 'Привет, {name}, вот ваш код подтверждения.',
  do_not_share_this_code_with_anyone: 'Не сообщайте этот код никому.',

  //* отключенный адрес электронной почты учетной записи *//
  your_account_has_been_disabled: 'Ваша учетная запись отключена.',
  we_are_sorry_that_you_decided_to_leave: 'Нам жаль, что вы решили уйти.',
  we_hope_that_you_come_back_soon: 'Мы надеемся, что вы скоро вернетесь.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'По запросу ваша учетная запись отключена и будет удалена через 30 дней.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'Если вы хотите повторно активировать свою учетную запись, просто войдите в систему снова.',
  if_you_wish_to_permanently_delete_your_account_now: 'Если вы хотите навсегда удалить свою учетную запись сейчас,',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'если вы не отключили свою учетную запись, ваша учетная запись может быть под угрозой.',

  //* удаленный адрес электронной почты учетной записи *//
  your_account_has_been_deleted: 'Ваша учетная запись была удалена.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'С этого момента вы больше не сможете войти в систему.',

  //* alt text *//
  logo_alt_text: 'Логотип Luna',
} satisfies BaseTranslation

export default ru
