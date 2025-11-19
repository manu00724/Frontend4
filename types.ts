// The expected structure based on the user's prompt
export interface BackendResponse {
  // Dictionary with fixed keys for any input
  processResult: Record<string, string>;
  
  // HTML converted content of one of the docs
  bgTextHtml: string;
  
  // List of onerous clauses
  Onerous: string[];
}

export enum SidebarTab {
  PROCESS = 'PROCESS',
  ONEROUS = 'ONEROUS'
}