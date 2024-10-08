// ==UserScript==
// @name        Toggle Surrounding Elements in MDN
// @namespace   Violentmonkey Scripts
// @grant       GM_setValue
// @grant       GM_getValue
// @match       *://developer.mozilla.org/en-US/docs/*
// @version     1.0
// @author      Angel Jimenez
// @description 10/8/2024, 10:06:19 AM
// ==/UserScript==

const styles = `
  h1 {
    margin: 0;
  }

  .header {
    margin-bottom: 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    border: 1px solid white;
    border-radius: 2px;
  }

  .btn.clicked:hover {
    border: 1px solid red;
    background: red;
  }


  .btn:hover {
    cursor: pointer;
    background: black;
  }
`

let isButtonToggled = GM_getValue('button-toggled', true)

const header = document.getElementsByTagName('h1')[0].parentNode
const toggleButton = document.createElement('button')
const styleSheet = document.createElement('style')

const classNames = [
  'sticky-header-container',
  'page-footer',
  'sidebar-container',
]
const targetElements = []

for (const className of classNames) {
  targetElements.push(document.getElementsByClassName(className)[0])
}

styleSheet.textContent = styles
toggleButton.textContent = '👁️'

document.head.appendChild(styleSheet)
header.appendChild(toggleButton)

header.classList.toggle('header')
toggleButton.classList.toggle('btn')

if (isButtonToggled) hidePageEls()

function hidePageEls(hidden = true) {
  let visibility = hidden ? 'hidden' : 'visible'

  for (const targetElement of targetElements) {
    targetElement.style.visibility = visibility
  }
}

function togglePageEls(hidden = true, hide = hidePageEls) {
  hide(hidden)
  toggleButton.classList.toggle('clicked')
  isButtonToggled = !isButtonToggled
}

toggleButton.addEventListener('click', () => {
  if (isButtonToggled) {
    togglePageEls(false)
  } else {
    togglePageEls()
  }

  GM_setValue('button-toggled', isButtonToggled)
})
