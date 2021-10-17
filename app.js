const list = document.querySelector('.list')
const items = []
const nameInput = document.querySelector('.name-input')
const costInput = document.querySelector('.cost-input')
const listForm = document.querySelector('.list-form')

function deleteBtnListener(btn) {
   btn.addEventListener('click', (e) => {
      e.preventDefault()

      const item = btn.parentNode
      item.remove()
   })
}

function editeBtnLisener(btn) {
   btn.addEventListener('click', (e) => {
      e.preventDefault()

      const item = btn.parentNode

      const formIsEditing = btn.dataset.editing
      if (formIsEditing === 'false') {
         editeItem(item, btn)
      } else {
         compliteEditingItem(item)
      }
   })
}

function compliteEditingItem(item) {
   console.log('test')

   const btn = item.querySelector('.btn-edite')
   const itemInputCost = item.querySelector('.input-cost')
   const itemInputName = item.querySelector('.input-name')
   const itemCost = document.createElement('span')
   const itemForm = item.querySelector('form')

   itemCost.classList.add('item-cost')
   const itemName = document.createElement('span')
   itemName.classList.add('item-name')

   btn.textContent = 'EDITE'

   const valueCost = itemInputCost.value
   const valueName = itemInputName.value

   itemCost.textContent = valueCost
   itemName.textContent = valueName

   itemForm.remove()
   item.prepend(itemCost)
   item.prepend(itemName)

   btn.type = 'button'
   btn.dataset.editing = 'false'
}

function editeItem(item, btn) {
   const itemCost = item.querySelector('.item-cost')
   const itemName = item.querySelector('.item-name')
   const valueCost = itemCost.textContent
   const valueName = itemName.textContent
   itemCost.remove()
   itemName.remove()

   const itemEditingForm = document.createElement('form')
   itemEditingForm.classList.add('item-form', 'form')
   const itemInputCost = document.createElement('input')
   itemInputCost.setAttribute('type', 'number')
   itemInputCost.classList.add('input-cost')
   const itemInputName = document.createElement('input')
   itemInputName.setAttribute('type', 'text')
   itemInputName.classList.add('input-name')
   itemInputCost.value = valueCost
   itemInputName.value = valueName

   itemEditingForm.appendChild(itemInputName)
   itemEditingForm.appendChild(itemInputCost)

   item.prepend(itemEditingForm)

   itemEditingForm.addEventListener('submit', (e) => {
      e.preventDefault()

      compliteEditingItem(item)
   })

   const formID = Math.random()
   itemEditingForm.id = formID
   btn.setAttribute('form', formID)

   btn.textContent = 'OK'
   btn.type = 'submit'
   btn.dataset.editing = 'true'
}

function addItem() {
   const item = document.createElement('li')
   item.classList.add('list-item', 'item')
   const itemCost = document.createElement('span')
   itemCost.classList.add('item-cost')
   const itemName = document.createElement('span')
   itemName.classList.add('item-name')
   const btnEditeItem = document.createElement('button')
   btnEditeItem.classList.add('btn-edite')
   btnEditeItem.dataset.editing = 'false'
   const btnDeleteItem = document.createElement('button')
   btnDeleteItem.classList.add('btn-delete')
   const params = items[0]

   itemCost.textContent = params[1]
   itemName.textContent = params[0]
   btnEditeItem.textContent = 'EDITE'
   btnDeleteItem.textContent = 'DEL'

   editeBtnLisener(btnEditeItem)
   deleteBtnListener(btnDeleteItem)

   item.appendChild(itemName)
   item.appendChild(itemCost)
   item.appendChild(btnEditeItem)
   item.appendChild(btnDeleteItem)

   list.prepend(item)
}

listForm.addEventListener('submit', (e) => {
   e.preventDefault()

   if (nameInput.value && costInput.value) {
      const itemProps = [nameInput.value, costInput.value]
      items.unshift(itemProps)
      addItem()
      nameInput.value = ''
      costInput.value = ''
   }
})
