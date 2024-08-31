import type { BaseTranslation } from '../i18n-types'

const en_us = {
  //* general *//
  hi_name: 'Hi {name}!',
  or: 'or',

  //* emails general *//
  if_you_did_not_request_this_email_ignore_it: 'If you did not create an account, please ignore this email.',
  if_you_have_any_questions: 'If you have any questions,',
  contact_us: 'please, contact us.',
  change_your_password: 'change your password.',
  for_security_reasons: 'For security reasons,',
  
  //* verification code email *//
  this_is_your_verification_code: 'This is your verification code, insert it in the app.',
  hi_name_here_is_your_verification_code: 'Hi {name:string}, here is your verification code.',
  do_not_share_this_code_with_anyone: 'Do not share this code with anyone.',

  //* disabled account email *//
  your_account_has_been_disabled: 'Your account has been disabled.',
  we_are_sorry_that_you_decided_to_leave: 'We are sorry that you decided to leave.',
  we_hope_that_you_come_back_soon: 'We hope that you come back soon.',
  as_requested_your_account_has_been_disabled_and_will_be_deleted_in_30_days: 'As requested, your account has been disabled and will be deleted in 30 days.',
  if_you_wish_to_reactivate_your_account_just_log_in_again: 'If you wish to reactivate your account, just log in again.',
  if_you_wish_to_permanently_delete_your_account_now: 'If you wish to permanently delete your account now,',
  if_you_did_not_disabled_your_account_your_account_may_be_in_risk: 'if you did not disable your account, your account may be in risk.',

  //* deleted account email *//
  your_account_has_been_deleted: 'Your account has been deleted.',
  from_this_point_on_you_will_no_longer_be_able_to_log_in: 'From this point on, you will no longer be able to log in.',

  //* alt text *//
  logo_alt_text: 'Luna Logo',
} satisfies BaseTranslation

export default en_us
