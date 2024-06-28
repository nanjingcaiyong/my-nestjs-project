export class Exception extends Error {
  constructor(public errors: any[]) {
    const message = errors.reduce((message, err) => {
      message += `${err.cause}: ${err.description}\r\n `;
      return message;
    }, '');
    super(message);
  }
}
