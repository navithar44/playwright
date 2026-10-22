import { expect, request, test } from '@playwright/test';

test('accepts valid Basic Auth credentials', async () => {
	const username = 'student';
	const password = 'student123';

	const apiContext = await request.newContext({
        baseURL: 'https://httpbin.org',
        httpCredentials: { 
	        username,
	        password
        }
	});

	const response = await apiContext.get(
			`/basic-auth/${username}/${password}`
		);

	expect(response.status()).toBe(200);
	const responseBody = await response.json();
	expect(responseBody).toMatchObject({
			authenticated: true,
			user: username
		});
    console.log(response.status());
    console.log(responseBody.authenticated);
});
