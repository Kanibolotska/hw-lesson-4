// ============================================================
// УРОК 4 - Події, DOMContentLoaded, IntersectionObserver
// ============================================================

// Задача №1
// Дано в html: три елементи з класом 'item'.
// При кліку на кожен з елементів треба додавати клас 'active', 
// а при повторному кліку - прибирати цей клас.

function task1() {
	const items = document.querySelectorAll('.item');
	items.forEach(item => {
		item.addEventListener('click', () => {
			item.classList.toggle('active');
		});
	});
	// ваш код тут

}


// Задача №2
// Дано елемент з класом 'card', який спочатку прозорий (opacity: 0).
// Дано кнопку з класом 'show-card-btn'.
// При кліку на цю кнопку треба додати елементу .card клас 'loaded'
// (який прибирає прозорість - opacity: 1).

function task2() {
	const card = document.querySelector('.card');
	const button = document.querySelector('.show-card-btn');
	if (card && button) {
		button.addEventListener('click', () => {
			card.classList.add('loaded');
		});
	}
}


// Задача №3
// Дано в html: header main footer
// При наведенні курсору на header треба змінити фон у footer.
// При виході курсору з header треба повернути початковий фон footer.

function task3() {
	const header = document.querySelector('header');
	const footer = document.querySelector('footer');
	if (header && footer) {
		header.addEventListener('mouseenter', () => {
			footer.style.backgroundColor = '#000';
		});
		header.addEventListener('mouseleave', () => {
			footer.style.backgroundColor = '';
		});
	}
	// ваш код тут

}


// Задача №4
// Дано в HTML елемент з класом '.counter-item', що має такі data-атрибути:
//   data-delay="1000" - затримка між числами (мс)
//   data-max="20" - до якого числа рахувати
// Вам треба створити функцію, яка будує інтервал що буде змінювати контент в елементі з класом '.counter-item' 
// виводячи цифру, яка збільшується на одиницю: 1 2 3 ... і т.д.з таким інтервалом, який вказаний в data-delay.
// Рахунок має починатися, коли елемент стає видимим на екрані (IntersectionObserver).
// Рахунок має зупинятися, коли досягає числа, вказаного в data-max.
// Інтервал не повинен запускатися повторно при повторному появленні елемента на екрані.

function task4() {
	const counterItem = document.querySelector('.counter-item');

	if (!counterItem) return;

	const delay = parseInt(counterItem.dataset.delay, 10) || 1000;
	const max = parseInt(counterItem.dataset.max, 10) || 20;

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				obs?.unobserve(entry.target);

				let count = 0;
				counterItem.textContent = count;

				const timer = setInterval(() => {
					count += 1;
					counterItem.textContent = count;

					if (count >= max) {
						clearInterval(timer);
					}
				}, delay);
			}
		});
	});

	observer.observe(counterItem);
}

// Не чіпати - потрібно і для тестів, і для браузера
if (typeof module !== 'undefined') module.exports = { task1, task2, task3, task4 };
export { task1, task2, task3, task4 };
