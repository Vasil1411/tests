import { test, expect, request, APIRequestContext } from '@playwright/test';

test('GET 14: Get User Account Detail by Email', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=test@automation.com');

  console.log('Status:', response.status());
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log('Response:', data);

  
  expect(data).toHaveProperty('user');
  expect(data.user).toHaveProperty('email');
  expect(data.user.email).toBe('test@automation.com');
});

// ============= POST TESTS =============

test('POST 7: Verify Login with Valid Credentials', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    form: {
      email: 'stu2401321014@uni-plovdiv.bg',
      password: 'Password123'
    }
  });

  console.log('Status:', response.status());
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log('Response:', data);

  
  expect(data).toHaveProperty('message');
  expect(data.message).toContain('User exists!'); // нямам създаден този user затова връща това съобщение, ако беше създаден щеше да връща 'User exists!'
});



test('POST 10: Verify Login with Invalid Details', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/verifyLogin', {
    form: {
      email: 'invaliddwatest.com',
      password: 'wrongpassword'
    }
  });

  console.log('Status:', response.status());
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log('Response:', data);

  
  expect(data).toHaveProperty('message');
  expect(data.message).toContain('User not found');
});




test('API 11: POST Create/Register User Account', async ({ request }) => {
  
  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: {
      name: 'Auto Test',
      email: 's4dw@uni-plovdiv.bg',
      password: 'Password123',
      title: 'Mr',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1990',
      firstname: 'Auto',
      lastname: 'Test',
      company: 'ACME',
      address1: '123 Main St',
      address2: '',
      country: 'Canada',
      zipcode: 'A1B2C3',
      state: 'StateX',
      city: 'CityX',
      mobile_number: '1234567890'
    }
  });

  console.log('Status:', response.status());
  const data = await response.json();
  console.log('Response:', data);

 
  expect(response.status()).toBe(200);

  
  expect(data).toHaveProperty('message');
  expect(data.message).toContain('User created!');
});