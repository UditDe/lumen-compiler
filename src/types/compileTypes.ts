export interface CompileRequestBody {
  code: string;
  input?: string;
}

export interface CompileResponse {
  output?: string;
  error?: string;
}
