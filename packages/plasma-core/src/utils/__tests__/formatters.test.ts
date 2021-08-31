import { monthLongName, monthShortName } from '../formatters';

test.each([
    [0, 'января'],
    [1, 'февраля'],
    [2, 'марта'],
    [3, 'апреля'],
    [4, 'мая'],
    [5, 'июня'],
    [6, 'июля'],
    [7, 'августа'],
    [8, 'сентября'],
    [9, 'октября'],
    [10, 'ноября'],
    [11, 'декабря'],
])("monthLongName(%s) return '%s'", (index, monthName) => {
    expect(monthLongName(index)).toBe(monthName);
});

test.each([
    [0, 'янв'],
    [1, 'февр'],
    [2, 'мар'],
    [3, 'апр'],
    [4, 'мая'],
    [5, 'июн'],
    [6, 'июл'],
    [7, 'авг'],
    [8, 'сент'],
    [9, 'окт'],
    [10, 'нояб'],
    [11, 'дек'],
])("monthShortName(%s) return '%s'", (index, monthName) => {
    expect(monthShortName(index)).toBe(monthName);
});
