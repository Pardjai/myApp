const table = document.querySelector('table')
const values = []
const nameInput = document.querySelector('.name-input')
const costInput = document.querySelector('.cost-input')
const button = document.querySelector('button')
const form = document.querySelector('form')

function deleteBtnListener(btn) {
   btn.addEventListener('click', (e) => {
      e.preventDefault()

      const line = btn.parentNode.parentNode
      line.remove()
   })
}

function editeBtnLisener(btn) {
   btn.addEventListener('click', (e) => {
      e.preventDefault()

      const line = btn.parentNode.parentNode
      const formIsEditing = !!+btn.dataset.editing
      if (formIsEditing) {
         compliteEditingLine(line)
      } else {
         editeLine(line)
      }
   })
}

function editeInputListener(elem) {
   elem.addEventListener('keyup', (e) => {
      const line = elem.parentNode.parentNode
      if (e.code == 'Enter') {
         compliteEditingLine(line)
      }
   })
}

function editeLine(tr) {
   const btn = tr.querySelector('.btn-edite')
   const tdButtons = btn.parentNode
   const tdCost = tdButtons.previousSibling
   const tdName = tdCost.previousSibling
   btn.textContent = 'OK'

   const valueCost = tdCost.textContent
   const valueName = tdName.textContent
   tdName.textContent = ''
   tdCost.textContent = ''

   const inputCost = document.createElement('input')
   inputCost.setAttribute('type', 'number')
   const inputName = document.createElement('input')
   inputName.value = valueName
   inputCost.value = valueCost

   tdCost.appendChild(inputCost)
   tdName.appendChild(inputName)

   editeInputListener(inputCost)
   editeInputListener(inputName)

   btn.dataset.editing = '1'
}

function compliteEditingLine(tr) {
   const btn = tr.querySelector('.btn-edite')
   const tdName = tr.querySelector('.td-name')
   const tdCost = tr.querySelector('.td-cost')
   const inputCost = tdCost.querySelector('input')
   const inputName = tdName.querySelector('input')

   btn.textContent = 'EDITE'

   const valueCost = inputCost.value
   const valueName = inputName.value

   tdCost.textContent = valueCost
   tdName.textContent = valueName

   btn.dataset.editing = '0'
}

function addPurshase() {
   const tdName = document.createElement('td')
   tdName.classList.add('td-name')
   const tdCost = document.createElement('td')
   tdCost.classList.add('td-cost')
   const tdButtons = document.createElement('td')
   tdButtons.classList.add('td-buttons')
   const btnEdite = document.createElement('button')
   btnEdite.classList.add('btn-edite')
   btnEdite.dataset.editing = '0'
   const btnDelete = document.createElement('button')
   btnDelete.classList.add('btn-delete')
   const tr = document.createElement('tr')
   const params = values[0]

   tdName.textContent = params[0]
   tdCost.textContent = params[1]
   btnEdite.textContent = 'EDITE'
   btnDelete.textContent = 'DEL'

   editeBtnLisener(btnEdite)
   deleteBtnListener(btnDelete)

   tdButtons.appendChild(btnEdite)
   tdButtons.appendChild(btnDelete)

   tr.appendChild(tdName)
   tr.appendChild(tdCost)
   tr.appendChild(tdButtons)

   table.prepend(tr)
}

form.addEventListener('submit', (e) => {
   e.preventDefault()

   if (nameInput.value && costInput.value) {
      const buy = [nameInput.value, costInput.value]
      values.unshift(buy)
      addPurshase()
      nameInput.value = ''
      costInput.value = ''
   }
})
