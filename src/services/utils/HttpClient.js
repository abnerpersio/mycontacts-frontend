import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeRequest(path, options = {}) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([header, value]) => {
        headers.append(header, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
      signal: options.signal,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    let body = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
      signal: options?.signal,
    });
  }
}

export default HttpClient;
