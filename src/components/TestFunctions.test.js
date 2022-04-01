import { handleHabitNumber, emailHandler } from './TestFunctions';

test('saveHabit', () => {
    expect(handleHabitNumber('3')).toBe(3);
});

test('emailHandler', () => {
    expect(emailHandler('MaThIlDa@Mail.Com')).toBe('mathilda@mail.com');
});
