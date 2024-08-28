import type { BaseTranslation } from '../i18n-types'

const en_us = {
  //* general *//
  hi_name: 'Hi {name}!',

  //* emails general *//
  if_you_did_not_request_this_email_ignore_it: 'If you did not create an account, please ignore this email.',
  if_you_have_any_questions: 'If you have any questions,',
  contact_us: 'contact us.',
  
  //* verification code email *//
  this_is_your_verification_code: 'This is your verification code, insert it in the app.',
  hi_name_here_is_your_verification_code: 'Hi {name:string}, here is your verification code.',
  do_not_share_this_code_with_anyone: 'Do not share this code with anyone.',

  //* alt text *//
  logo_alt_text: 'Luna Logo',
} satisfies BaseTranslation

export default en_us
