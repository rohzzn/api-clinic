# API Clinic
API Clinic is a powerful and user-friendly API testing tool designed to simplify the process of testing and debugging APIs. It provides essential features for sending requests, inspecting responses, and managing environment variables, all within a clean and intuitive interface.

![575_1x_shots_so](https://github.com/user-attachments/assets/4aaeab8c-24ad-45e5-b988-0051085dd774)

## Features

- **Request Builder**: Easily construct GET, POST, PUT, DELETE, and other HTTP requests.
- **Response Viewer**: View and analyze response headers, status codes, and body content.
- **Environment Variables**: Manage different environments (development, staging, production) with variable support.
- **History Logs**: Keep a history of all API requests and responses for reference.
- **Import/Export**: Save and load your API testing sessions for convenience and sharing.

## Usage

1. **Making a Request**:
   - Select the HTTP method (GET, POST, etc.) from the dropdown.
   - Enter the API URL in the URL field.
   - Add any necessary headers in the Headers tab.
   - If needed, add a request body in the Body tab.
   - Click "Send Request" to make the API call.

2. **Viewing the Response**:
   - The response will be displayed in the Response section, showing status, headers, and body.

3. **Using Environment Variables**:
   - Add environment variables in the Environment Variables section.
   - Use variables in your requests by wrapping them in double curly braces, e.g., `{{variable_name}}`.

4. **Managing History**:
   - Previous requests are automatically saved in the History panel
   - Click on any history item to reload it

## Example APIs for Testing

Here are some free, public APIs you can use to test the tool:

### 1. Get User Profile from GitHub
```
Method: GET
URL: https://api.github.com/users/octocat
Headers:
Accept: application/vnd.github.v3+json
```

### 2. Create a New Post
```
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
Headers:
Content-Type: application/json

Body:
{
  "title": "Test Post",
  "body": "This is a test post body",
  "userId": 1
}
```

### 3. Get Random User Data
```
Method: GET
URL: https://randomuser.me/api/
Headers:
Accept: application/json
```

### 4. Search Books on Google Books API
```
Method: GET
URL: https://www.googleapis.com/books/v1/volumes?q=harry+potter
Headers:
Accept: application/json
```

### 5. Create a Todo
```
Method: POST
URL: https://jsonplaceholder.typicode.com/todos
Headers:
Content-Type: application/json

Body:
{
  "userId": 1,
  "title": "Complete API testing",
  "completed": false
}
```

## Environment Variable Examples

Here are some common environment variables you might want to set up:

```
BASE_URL: https://api.example.com
AUTH_TOKEN: your-auth-token
API_KEY: your-api-key
```

Then use them in your requests like:
- URL: `{{BASE_URL}}/users`
- Headers: `Authorization: Bearer {{AUTH_TOKEN}}`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
