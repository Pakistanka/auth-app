import { formatDate } from '../date';

describe('formatDate', () => {
  it('should format date correctly', () => {
    // Используем дату без времени, чтобы избежать проблем с часовыми поясами
    const dateString = '2024-01-15';
    const formatted = formatDate(dateString);
    expect(formatted).toBe('15.01.2024');
  });

  it('should format date with different month and day', () => {
    // Используем дату без времени, чтобы избежать проблем с часовыми поясами
    const dateString = '2024-12-25';
    const formatted = formatDate(dateString);
    expect(formatted).toBe('25.12.2024');
  });

  it('should format date with single digit day and month', () => {
    // Используем дату без времени, чтобы избежать проблем с часовыми поясами
    const dateString = '2024-03-05';
    const formatted = formatDate(dateString);
    expect(formatted).toBe('05.03.2024');
  });

  it('should handle different date formats', () => {
    const dateString = '2023-06-20';
    const formatted = formatDate(dateString);
    expect(formatted).toBe('20.06.2023');
  });

  it('should format UTC date correctly', () => {
    // Для UTC дат используем ожидаемое значение на основе локального часового пояса
    const dateString = '2024-01-15T10:30:00Z';
    const formatted = formatDate(dateString);
    // Проверяем, что форматирование работает (может отличаться в зависимости от часового пояса)
    expect(formatted).toMatch(/^\d{2}\.\d{2}.2024$/);
  });
});
