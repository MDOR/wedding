import './polyfill/array-from';

const MAX_HEIGHT = 1080
const home = document.querySelector('#home')
const imgs = Array.from(document.querySelectorAll('img'))
const body = document.body || document.documentElement;

const  debouncer = (fn, time = 100) => {
  let timeout

  return function debouncedFn(...args) {
  	clearTimeout(timeout)
  	timeout = setTimeout(() => (timeout = null, fn(...args)), time)
  }
}

function setHomeSize() {
  const windowHeight = window.innerHeight || document.document.documentElement.clientHeight || document.body.clientHeight
  home.style.height = `${windowHeight > MAX_HEIGHT ? MAX_HEIGHT : windowHeight}px`
}

const debouncedSetHome = debouncer(setHomeSize);
/* set home size */
(setHomeSize)();
window.addEventListener('resize', debouncedSetHome);

const getCurrentScroll = () => document.scrollTop  || document.documentElement.scrollTop  || document.body.scrollTop

function scrollToUtil (target = 0) {
	const beginning = getCurrentScroll()
	const increment =  (target - beginning) / 100
	const initial = target;
	let timeout;
	function scroll() {
		const current = getCurrentScroll()
		window.scrollTo(0, current + increment)

		if (
			current === target ||
			(initial > beginning && target < current) ||
			(initial < beginning && target > current)
		) return

		timeout = setTimeout(() => window.requestAnimationFrame(scroll), 10)
	}

	const cancel = () => (
    clearTimeout(timeout),
    window.cancelAnimationFrame(scroll)
	)

	window.addEventListener('resize', cancel)
	window.requestAnimationFrame(scroll)
}

const move = document.querySelectorAll('[data-move-to]')

Array.from(move).forEach((item) => {
	function moveTo (e) {
    e.preventDefault()
    const to = e.currentTarget.dataset.moveTo
    const target = document.querySelector(to)
    scrollToUtil(target.scrollHeight)
	}

	item.addEventListener('click', moveTo)
})

const points = Array.from(document.querySelectorAll('.points'))
const randomizer = () => ((Math.random() * 15) + 10) * (Math.random() > .5 ? 1 : -1)

function backgroundChange(item) {
  const y = randomizer()
  const { backgroundPositionY } = item.style;

  const newY = parseFloat(backgroundPositionY.replace('px', '') || 0) + y
  item.style.backgroundPositionY = `${newY || 0}px`
}

window.addEventListener('scroll', debouncer(() =>
	points.forEach(c => backgroundChange(c)),
30));

/* Back to Top */
const backTop = document.querySelector('.back-top');
function displayBackTop() {
	const windowHeight = window.innerHeight || document.document.documentElement.clientHeight || document.body.clientHeight
	const shouldHide = getCurrentScroll() < windowHeight/2

	backTop.style.opacity = shouldHide ? 0 : 1;

	setTimeout(() => backTop.style.display = shouldHide ? 'none': 'block', 500);
}

window.addEventListener('scroll', debouncer(() => displayBackTop()), 30)
displayBackTop()
backTop.addEventListener('click', e => {
	e.preventDefault()
	scrollToUtil(0)
})