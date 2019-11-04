import './polyfill/array-from';
import Masonry from 'masonry-layout';
import 'waypoints/lib/noframework.waypoints.js'

const MAX_HEIGHT = 1080

const windowHeight = window.innerHeight || document.document.documentElement.clientHeight || document.body.clientHeight
const home = document.querySelector('#home')

home.style.height = `${windowHeight > MAX_HEIGHT ? MAX_HEIGHT : windowHeight}px`

function generateGrids() {
	return Array.from(document.querySelectorAll('.img-grid')).map((grid) => (
		new Masonry(grid, {
	 	  itemSelector: '.grid-item',
	 	  percentPosition: true,
	 	  columnWidth: '.grid-sizer'
		})
	))
}

const imgs = Array.from(document.querySelectorAll('img'))
let interalForLogImg;

interalForLogImg = setInterval(() => {
	if (imgs.find(img => !img.src)) return

	clearInterval(interalForLogImg)
  generateGrids()
}, 1500)