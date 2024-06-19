import {
  Result,
  ResultStatus,
  ResultMessage,
} from '@/packages/utils/ResultStatus';

export class BaseController {
  constructor() {}
  JsonBackResult(status: ResultStatus): Result;
  JsonBackResult(status: ResultStatus, data: any): Result;
  JsonBackResult(status: ResultStatus, data: any, retInfo: string): Result;
  JsonBackResult(status: ResultStatus, data?: any, retInfo?: string): Result {
    const result: Result = JSON.parse(
      JSON.stringify({ status, data, retInfo }),
    );
    if (Object.keys(result).length === 2 && typeof data === 'string') {
      result.retInfo = result.data;
      delete result.data;
    }
    (result['success'] = status === ResultStatus.Success),
      (result['retInfo'] = result['retInfo'] ?? ResultMessage[status]);
    return result;
  }
}
