export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
    fields?: Record<string, string>;
  };

  if (!response.ok) {
    throw new ApiError(
      data.error ?? "Não foi possível concluir o pedido.",
      response.status,
      data.fields,
    );
  }

  return data as T;
}
