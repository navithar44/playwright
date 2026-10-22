import { expect, request, test } from '@playwright/test';

test('rejects invalid Basic Auth credentials', async () => {
    const username = 'student';
    const expectedPassword = 'student123';
    const wrongPassword = 'student12345';

    const apiContext = await request.newContext({
        baseURL: 'https://httpbin.org',
        httpCredentials: { 
            username,
            password: wrongPassword
        }
    });

    const response = await apiContext.get(
            `/basic-auth/${username}/${wrongPassword}`
        );

    expect(response.status()).toBe(401);
        console.log(response.status());
});
