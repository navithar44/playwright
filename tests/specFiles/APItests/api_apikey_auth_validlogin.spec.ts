import { expect, test } from '@playwright/test';
import process from 'process';

test('accepts valid API key credentials', async ({ request }) => {
	const apiKey = process.env.REQRES_API_KEY 
	expect(apiKey, 'Set the REQRES_API_KEY environment variable').toBeTruthy();

	const response = await request.get('https://reqres.in/api/collections/products/records', {
		headers: {
			'x-api-key': apiKey!,
		},
	});

	console.log('response.status():', response.status());
	expect(response.status()).toBe(200);
    console.log('response.statusText():', response.statusText());
    console.log('response.ok():', response.json());
});
