import { test, expect } from '@playwright/test';
import { testNames } from '../testData/userNames';

test('GivenExistingUsers_WhenGetUserListIsCalled_ThenUserListIsNotEmpty', async ({ request }) => {
    //Arrange
    const endpoint = '/api/users?page=2';

    //Act
    const response = await request.get(endpoint);
    const users = await response.json();

    //Assert
    expect(response.ok()).toBeTruthy();
    expect(users.data.length).toBeGreaterThan(0);
});

testNames.forEach((data) => {
    test(`Given${data.name}_WhenCreateNewUserIsCalled_ThenNewUserIsCreatedCorrectly`, async ({ request }) => {
        //Arrange
        const endpoint = '/api/users';

        //Act
        const response = await request.post(endpoint, { data });
        const user = await response.json();
        
        //Assert
        expect(response.ok()).toBeTruthy();
        expect(user.name).toBe(data.name);
        expect(user.job).toBe(data.job);
        expect(user.id).not.toBeNull;
    });
});

test('GivenValidUserDetails_WhenUpdateUserIsCalled_ThenUserIsUpdatedCorrectly', async ({ request }) => {
    //Arrange
    const endpoint = '/api/users/2';
    const updatedUser = {
      name: "New Updated Name",
      job: "Awesome job"
    };

    //Act
    const response = await request.put(endpoint, { data: updatedUser });
    const user = await response.json();

    //Assert
    expect(response.ok()).toBeTruthy();
    expect(user.name).toBe(updatedUser.name);
    expect(user.job).toBe(updatedUser.job);
  });