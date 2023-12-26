export class ResponseHandler {
  constructor(message: any, status: number) {
    return {
      status,
      message,
    };
  }
}
