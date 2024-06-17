import chalk from 'chalk';

export class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public details = {}
  ) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.details = details;
  }

  public override toString() {
    const stringified = JSON.stringify(
      { status: this.code, message: this.message, details: this.details },
      null,
      2
    );
    return chalk.red(`[ERROR] : ${stringified}`);
  }
}
