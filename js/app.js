const slider = document.querySelector("input")
const track = document.querySelector(".component__billing-pageviews-slider-track")

const pageviewsEl = document.querySelector(".component__billing-pageviews-amount")
const pricingEl = document.querySelector(".component__billing-pageviews-pricing-dollar")

const toggle = document.querySelector(".component__billing-time-toggle")
const toggleInput = document.querySelector("#toggle")

slider.addEventListener("input", selectPricing)
toggleInput.addEventListener("change", switchToggle)

let pricingList = [
  {
    pageviews: "10K",
    price: 8
  },
  {
    pageviews: "50K",
    price: 12
  },
  {
    pageviews: "100K",
    price: 16
  },
  {
    pageviews: "500K",
    price: 24
  },
  {
    pageviews: "1M",
    price: 36
  }
]

function switchToggle(e) {
  e.target.checked ? toggle.classList.replace("inactive", "active") : toggle.classList.replace("active", "inactive")
  applyDiscount(e.target.checked)
}

function applyDiscount(checked) {
  const price = parseInt(pricingEl.textContent.slice(1)).toFixed(2)
  const percentage = ((price * 25) / 100)
  const amount = (price - percentage).toFixed(2)

  if (checked) {
    pricingEl.textContent = `$${amount}`
  } else {
    pricingEl.textContent = `$${pricingList[slider.value-1].price.toFixed(2)}`
  }
}

function selectPricing(e) {
  const value = e.target.value
  const totalInputWidth = e.target.getClientRects()[0].width


  changePricing(value, pricingList)
  changeTrackProgress(value, totalInputWidth)
}

function changePricing(value, list) {
  const pageviews = list[value-1].pageviews
  const price = list[value-1].price.toFixed(2)

  const percentage = (price - ((price * 25) / 100)).toFixed(2)

  pageviewsEl.textContent = `${pageviews} PAGEVIEWS`

  if (toggleInput.checked) {
    pricingEl.textContent = `$${percentage}`
  } else {
    pricingEl.textContent = `$${price}`
  }
}

function changeTrackProgress(value, totalInputWidth) {
  const minValue = 1
  const maxValue = 5
  const thumbHalfWidth = 25
  
  const left = (((value - minValue) / (maxValue - minValue)) * ((totalInputWidth - thumbHalfWidth) - thumbHalfWidth)) + thumbHalfWidth;

  track.style.width = `${left}px`
}