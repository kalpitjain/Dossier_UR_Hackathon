import type { Principal } from '@dfinity/principal';
export interface ActivityLog {
  'date' : string,
  'time' : string,
  'user' : string,
  'amount' : string,
  'activity' : string,
}
export interface Log {
  'title' : string,
  'content' : string,
  'userId' : string,
  'date' : string,
  'time' : string,
}
export interface _SERVICE {
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'createActivityLog' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
    ) => Promise<undefined>,
  'createLog' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: string,
      arg_4: string,
    ) => Promise<undefined>,
  'deductCreateLogFee' : () => Promise<string>,
  'deductDeleteLogFee' : () => Promise<string>,
  'faucetAmount' : () => Promise<bigint>,
  'getCreateLogFee' : () => Promise<bigint>,
  'getDeleteLogFee' : () => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'payOut' : () => Promise<string>,
  'readActivityLogs' : () => Promise<Array<ActivityLog>>,
  'readLogs' : () => Promise<Array<Log>>,
  'removeLog' : (arg_0: bigint) => Promise<undefined>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
