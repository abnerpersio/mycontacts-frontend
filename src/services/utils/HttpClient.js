import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path, options) {
    const response = await fetch(`${this.baseUrl}${path}`, options);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let body = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(path, body) {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
