export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'list';
}
