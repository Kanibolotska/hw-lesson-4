/**
 * @jest-environment jsdom
 */

const { task1, task2, task3, task4 } = require('../solution/solution');

beforeEach(() => {
	document.body.innerHTML = '';
	document.body.removeAttribute('class');
	document.body.removeAttribute('style');
});

describe('Урок 4 — Події', () => {

	test('Задача 1: клік додає клас active, повторний клік прибирає', () => {
		document.body.innerHTML = `
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
    `;
		task1();

		const items = document.querySelectorAll('.item');

		items[0].click();
		expect(items[0].classList.contains('active')).toBe(true);

		items[0].click();
		expect(items[0].classList.contains('active')).toBe(false);

		expect(items[1].classList.contains('active')).toBe(false);
	});

	test('Задача 2: клік на кнопку додає клас loaded елементу .card', () => {
		document.body.innerHTML = `
      <button class="show-card-btn">Показати</button>
      <div class="card"></div>
    `;
		task2();
		const btn = document.querySelector('.show-card-btn');
		const card = document.querySelector('.card');

		expect(card.classList.contains('loaded')).toBe(false);
		btn.click();
		expect(card.classList.contains('loaded')).toBe(true);
	});

	test('Задача 3: mouseenter на header змінює фон footer', () => {
		document.body.innerHTML = `
      <header></header>
      <main></main>
      <footer></footer>
    `;
		task3();

		const header = document.querySelector('header');
		const footer = document.querySelector('footer');
		const initialBg = footer.style.backgroundColor;

		header.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		const newBg = footer.style.backgroundColor;
		expect(newBg).not.toBe('');
		expect(newBg).not.toBe(initialBg);

		header.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		expect(footer.style.backgroundColor).toBe(initialBg);
	});

	test('Задача 4: інтервал рахує від 1 до data-max і зупиняється', () => {
		jest.useFakeTimers();

		document.body.innerHTML = `
      <div class="counter-item" data-delay="100" data-max="5"></div>
    `;

		global.IntersectionObserver = class {
			constructor(cb) { this.cb = cb; }
			observe(el) {
				this.cb([{ isIntersecting: true, target: el }]);
			}
			unobserve() { }
		};

		task4();

		const item = document.querySelector('.counter-item');

		jest.advanceTimersByTime(100);
		expect(item.textContent).toBe('1');

		jest.advanceTimersByTime(100);
		expect(item.textContent).toBe('2');

		jest.advanceTimersByTime(300);
		expect(item.textContent).toBe('5');

		jest.advanceTimersByTime(500);
		expect(item.textContent).toBe('5');

		jest.useRealTimers();
	});

});
