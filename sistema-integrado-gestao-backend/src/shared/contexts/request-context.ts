import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContext {
  private orgaoId: number;
  private userId: number;
  private additionalData: Map<string, any> = new Map();

  setOrgaoId(id: number): void {
    this.orgaoId = id;
  }

  getOrgaoId(): number {
    return this.orgaoId;
  }

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }

  set(key: string, value: any): void {
    this.additionalData.set(key, value);
  }

  get(key: string): any {
    return this.additionalData.get(key);
  }
}
