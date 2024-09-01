import type { BaseTranslation } from '../i18n-types'

const fr = {
  //* général *//
  hi_name: 'Salut {name}!',
  or: 'ou',

  //* e-mails général *//
  if_you_did_not_request_this_email_ignore_it: 'Si vous n\'avez pas créé de compte, veuillez ignorer cet e- mail.',
  if_you_have_any_questions: 'Si vous avez des questions,',
  contact_us: 'Veuillez nous contacter.',
  change_your_password: 'Changez votre mot de passe.',
  for_security_reasons: 'Pour des raisons de sécurité,',

  //* e-mail de code de vérification *//
  this_is_your_verification_code: 'Ceci est votre code de vérification, insérez-le dans l\'application.',
  hi_name_here_is_your_verification_code: 'Salut {name}, voici votre code de vérification.',
  do_not_share_this_code_with_anyone: 'Ne partagez pas ce code avec n\'importe qui.',

  //* adresse e-mail du compte désactivée *//
  your_account_has_been_disabled: 'Votre compte a été désactivé.',
  we_are_sorry_that_you_decided_to_leave: 'Nous sommes désolés que vous ayez décidé de partir.',
  we_hope_that_you_come_back_soon: 'Nous espérons que vous reviendrez bientôt.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'Comme demandé, votre compte a été désactivé et sera supprimé dans 30 jours.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'Si vous souhaitez réactiver votre compte, connectez-vous à nouveau.',
  if_you_wish_to_permanently_delete_your_account_now: 'Si vous souhaitez le réactiver de manière permanente supprimez votre compte maintenant,',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'si vous n\'avez pas désactivé votre compte, votre compte peut être en danger.',

  //* adresse e-mail du compte supprimé *//
  your_account_has_been_deleted: 'Votre compte a été supprimé.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'A partir de ce moment, vous ne pourrez plus vous connecter.',

  //* texte alternatif *//
  logo_alt_text: 'Logo Luna',
} satisfies BaseTranslation

export default fr
