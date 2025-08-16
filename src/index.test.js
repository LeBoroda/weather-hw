import fs from 'fs';
import path from 'path';

describe('Sample page test', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8',
    );
    import('./index.js');
  });
  afterEach(() => {
    jest.resetModules();
  });

  test('Element exists', () => {
    expect(document.querySelector('h1')).not.toBe(null);
  });
  test('Header text changed', () => {
    const h1 = document.querySelector('h1');
    expect(h1.innerText).toBe('There is no spoon!');
  });
  test('Header color changed', () => {
    const h1 = document.querySelector('h1');
    expect(h1.style.color).toBe('blue');
  });
  test('Background color changed', () => {
    expect(document.body.style.backgroundColor).toBe('green');
  });
});
