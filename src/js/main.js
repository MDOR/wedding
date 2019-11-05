import './polyfill/array-from';
import Masonry from 'masonry-layout';
import 'waypoints/lib/noframework.waypoints.js';

const MAX_HEIGHT = 1080
const home = document.querySelector('#home')
const imgs = Array.from(document.querySelectorAll('img'))
const body = document.body || document.documentElement;

const  debouncer = (fn, time = 100) => {
  let timeout

  return function debouncedFn(...args) {
  	clearTimeout(timeout);
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

function generateGrids() {
	return Array.from(document.querySelectorAll('.img-grid')).map((grid) => (
		new Masonry(grid, {
	 	  itemSelector: '.grid-item',
	 	  percentPosition: true,
	 	  columnWidth: '.grid-sizer'
		})
	))
}

let interalForLogImg;
interalForLogImg = setInterval(() => {
	if (imgs.find(img => !img.src)) return

	clearInterval(interalForLogImg)
  generateGrids()
}, 1500)

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

	const cancel = () => console.log('cancel') ||(
    clearTimeout(timeout),
    window.cancelAnimationFrame(scroll)
	)

	window.addEventListener('scroll', cancel);

	window.requestAnimationFrame(scroll)
}

const move = document.querySelectorAll('[data-move-to]');

Array.from(move).forEach((item) => {
	function moveTo (e) {
    e.preventDefault()
    const to = e.currentTarget.dataset.moveTo
    const target = document.querySelector(to)
    console.log(to, target)
    console.log(target.scrollHeight)
    scrollToUtil(target.scrollHeight)
	}

	item.addEventListener('click', moveTo)
})