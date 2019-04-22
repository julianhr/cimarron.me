import fieldErrorFuncs, { ERRORS } from '../fieldErrorFuncs'


describe('fieldErrorFuncs', () => {
  describe('email', () => {
    const { email } = fieldErrorFuncs

    it('cannot be empty', () => {
      expect(email()).toEqual(ERRORS.required())
      expect(email('')).toEqual(ERRORS.required())
    })

    it('is a valid address', () => {
      expect(email('valid@email.com')).toBeFalsy()
      expect(email('invalidstring')).toEqual(ERRORS.email())
      expect(email('@nousername.com')).toEqual(ERRORS.email())
      expect(email('no@domain')).toEqual(ERRORS.email())
    })

    it('cannot be less than 8 characters long', () => {
      expect(email('a@b.com')).toEqual(ERRORS.length(8, 50))
      expect(email('a@bc.com')).toBeFalsy()
    })

    it('cannot be more than 50 characters long', () => {
      const username = '1234567890'.repeat(4)
      expect(email(username + '@abcde.com')).toBeFalsy()
      expect(email(username + 'a' + '@abcde.com')).toEqual(ERRORS.length(8, 50))
    })
  })

  describe('name', () => {
    const { name } = fieldErrorFuncs

    it('cannot be empty', () => {
      expect(name()).toEqual(ERRORS.required())
      expect(name('')).toEqual(ERRORS.required())
    })

    it('cannot be less than 2 characters', () => {
      expect(name('a')).toEqual(ERRORS.length(2, 50))
      expect(name('ab')).toBeFalsy()
    })

    it('cannot be less more than 50 characters', () => {
      const testName = '0123456789'.repeat(5)
      expect(name(testName)).toBeFalsy()
      expect(name(testName + 'a')).toEqual(ERRORS.length(2, 50))
    })
  })

  describe('subject', () => {
    const { subject } = fieldErrorFuncs

    it('cannot be empty', () => {
      expect(subject()).toEqual(ERRORS.required())
      expect(subject('')).toEqual(ERRORS.required())
    })

    it('cannot be less than 2 characters', () => {
      expect(subject('a')).toEqual(ERRORS.length(2, 120))
      expect(subject('ab')).toBeFalsy()
    })

    it('cannot be less more than 120 characters', () => {
      const testSubject = '0123456789'.repeat(12)
      expect(subject(testSubject)).toBeFalsy()
      expect(subject(testSubject + 'a')).toEqual(ERRORS.length(2, 120))
    })
  })

  describe('message', () => {
    const { message } = fieldErrorFuncs

    it('cannot be empty', () => {
      expect(message()).toEqual(ERRORS.required())
      expect(message('')).toEqual(ERRORS.required())
    })

    it('cannot be less than 50 characters', () => {
      const testMessage = '0123456789'.repeat(5)
      expect(message(testMessage.slice(0, -1))).toEqual(ERRORS.length(50, '10,000'))
      expect(message(testMessage)).toBeFalsy()
    })

    it('cannot be less more than 10,000 characters', () => {
      const testMessage = '0123456789'.repeat(1000)
      expect(message(testMessage.slice(0, -1))).toBeFalsy()
      expect(message(testMessage + 'a')).toEqual(ERRORS.length(50, '10,000'))
    })
  })
})
