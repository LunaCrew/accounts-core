import type { BaseTranslation } from '../i18n-types'

const en_us = {
  // salutations
  hi_name: 'Hi {name:string}!',

  // confirmation email
  confirm_your_email: '{name:string}, confirm your email',
  please_confirm_your_email: 'Please confirm your email',
  
  click_the_button_below_to_confirm_your_email: 'Click the button below to confirm your email.',
  confirm_email: 'Confirm email',
  do_not_share_this_code_with_anyone: 'Do not share this code with anyone.',
  
  if_the_button_does_not_work_please_paste_this_code_in_the_app: 'If the link does not work, please copy this code and paste it in the app.',
  if_you_did_not_request_this_email_ignore_it: 'If you did not create an account, please ignore this email.',
  if_you_have_any_questions: 'If you have any questions,',
  contact_us: 'contact us.',

  // alt text
  logo_alt_text: 'Luna Logo',
} satisfies BaseTranslation

export default en_us
