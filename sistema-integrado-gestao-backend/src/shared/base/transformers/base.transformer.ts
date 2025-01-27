export abstract class BaseTransformer<T> {
  protected static excludeAuditFields(data: any): any {
    const {
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      ...cleanData
    } = data;

    return cleanData;
  }

  static transform(data: any): any {
    if (!data) return null;
    const cleanData = this.excludeAuditFields(data);
    return {
      id: data.id,
      ...cleanData,
    };
  }

  static transformList(dataList: any[]): any[] {
    if (!dataList) return [];
    return dataList.map((data) => this.transform(data));
  }
}
