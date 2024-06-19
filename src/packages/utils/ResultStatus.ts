export enum ResultStatus {
  Success = '200',
  Fail = '001',
  NoLogin = '002',
  Expired = '003',
  Empty = '004',
  Repeat = '005',
  NoExist = '404',
  ServerError = '500',
}

export interface Result {
  success: boolean;
  retCode: ResultStatus;
  data?: any;
  retInfo?: string;
}

export const ResultMessage = {
  '200': '操作成功！',
  '001': '操作失败！',
  '002': '未登录！',
  '003': '未登录/登录已过期，请先登录！',
  '004': '字段不能为空！',
  '005': '重复创建！',
  '404': '页面不存在！',
  '500': '服务器异常！',
};
