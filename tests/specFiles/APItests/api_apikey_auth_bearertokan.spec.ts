import { expect, test } from '@playwright/test';

test('accepts valid Bearer token credentials', async ({ request }) => {
	const username = 'emilys';
	const password = 'emilyspass';

	const loginResponse = await request.post('https://dummyjson.com/auth/login', {
		data: {
			username,
			password,
		},
	});

	console.log('loginResponse.status():', loginResponse.status());
	expect(loginResponse.status()).toBe(200);

	const responseBody = await loginResponse.json();
	const accessToken = responseBody.accessToken;
	expect(accessToken, 'Expected a bearer token in the login response').toBeTruthy();
	console.log('accessToken', accessToken);

	const profileResponse = await request.get('https://dummyjson.com/auth/me', {
		headers: {
		Authorization: `Bearer ${accessToken}`,
	},
	});

	 expect(profileResponse.status()).toBe(200);
});

    