import type { Translation } from '../i18n-types'

const pt_br = {
  //* geral *//
  hi_name: 'Olá {name}!',
  or: 'ou',

  //* emails geral *//
  if_you_did_not_request_this_email_ignore_it: 'Se você não solicitou este e-mail, por favor, ignore-o.',
  if_you_have_any_questions: 'Se tiver qualquer dúvida,',
  contact_us: 'por favor, entre em contato conosco.',
  change_your_password: 'altere sua senha.',
  for_security_reasons: 'Por motivos de segurança,',

  //* email para código de verificação *//
  this_is_your_verification_code: 'Este é seu código de verificação, insira-o no aplicativo.',
  hi_name_here_is_your_verification_code: 'Olá {name}, aqui está seu código de verificação.',
  do_not_share_this_code_with_anyone: 'Não compartilhe este código com ninguém.',

  //* email para conta desabilitada *//
  your_account_has_been_disabled: 'Sua conta foi desativada.',
  we_are_sorry_that_you_decided_to_leave: 'Lamentamos que não queira mais utilizar Luna.',
  we_hope_that_you_come_back_soon: 'Esperamos que você volte em breve.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'Conforme solicitado, sua conta foi desativada e será excluída em 30 dias.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'Caso deseje reativar sua conta, basta fazer login novamente.',
  if_you_wish_to_permanently_delete_your_account_now: 'Caso deseje excluir sua conta permanentemente agora,',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'Se você não desabilitou sua conta, ela pode estar em risco.',

  //* email para conta excluída *//
  your_account_has_been_deleted: 'Sua conta foi excluída.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'A partir deste momento, você não poderá mais fazer login.',

  //* texto alternativo *//
  logo_alt_text: 'Luna Logo',
} satisfies Translation

export default pt_br
