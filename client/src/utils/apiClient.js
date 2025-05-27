export class ApiClient {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async delete(url, options = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      credentials: "include",
      ...options,
    });

    if (response.status === 403) {
      throw new Response(
        JSON.stringify({
          message: "You are not authorized to perform this action.",
        }),
        { status: 403 }
      );
    }

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Error deleting resource" }),
        { status: response.status }
      );
    }

    return response;
  }

  async patch(url, body, options = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });

    console.log(response);

    if (response.status === 401) {
      return {
        message: "You are not authorized to perform this action.",
        status: 401,
      };
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Response(
        JSON.stringify({ message: data.message || "Error updating resource" }),
        { status: response.status }
      );
    }

    return response;
  }

  async post(url, body, options = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 400) {
      const data = await response.json();
      return {
        message: data.message || "Bad request",
        status: 400,
      };
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Response(
        JSON.stringify({ message: data.message || "Error creating resource" }),
        { status: response.status }
      );
    }

    return response;
  }
}
