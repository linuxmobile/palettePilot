export function stripError(error: Error) {
  // This regex removes status code and other irrelevant information from
  // the error message so it can be shown as is to the user
  return (
    error.message.match(/(\d{1,3})\s(.*)$/)?.at(2) ??
    'Something went wrong. Try again!'
  )
}
