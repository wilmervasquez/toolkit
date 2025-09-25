class SignInError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

export { SignInError as LoginError }
