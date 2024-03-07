const bookInfoForm = document.querySelector('#add-book-form')
const libraryDisplay = document.querySelector('output')
const formReadButton = document.querySelector('#read')

const library = []

class Book {
	constructor(title, author, pages, read) {
		this.title = title
		this.author = author
		this.pages = pages
		this.read = read
	}

	getInfo() {
		return `${this.title} is by ${this.author}, has ${
			this.pages
		} pages, and ${this.read ? 'has' : "hasn't"} been read.`
	}
}

const addBook = () => {
	let bookTitle = document.querySelector('#title').value
	let bookAuthor = document.querySelector('#author').value
	let bookPages = document.querySelector('#pages').value
	let bookRead = document.querySelector('#read').checked

	let book = new Book(bookTitle, bookAuthor, bookPages, bookRead)

	library.push(book)
	createBookCard(book)
}

const createBookCard = (book) => {
	let bookCard = document.createElement('div')
	let cardTitle = document.createElement('p')
	let cardAuthor = document.createElement('p')
	let cardPages = document.createElement('p')
	let buttonContainer = document.createElement('div')
	let cardReadContainer = document.createElement('div')
	let cardButtonLabel = document.createElement('label')
	let cardReadButton = document.createElement('input')
	let deleteButton = document.createElement('button')

	cardReadButton.name = 'read-status'
	cardReadButton.type = 'checkbox'
	cardReadButton.role = 'toggle'
	deleteButton.id = library.indexOf(book)
	// cardButton.id = 'read-status'

	bookCard.classList.add('book-card')
	cardTitle.classList.add('book-title')
	cardAuthor.classList.add('book-author')
	cardPages.classList.add('book-pages')
	buttonContainer.classList.add('card-btns')
	cardReadContainer.classList.add('read-btn')
	cardButtonLabel.setAttribute('for', 'read-status')
	deleteButton.classList.add('delete-btn')

	cardTitle.textContent = `${book.title}`
	cardAuthor.textContent = `${book.author}`
	cardPages.textContent = `Pages: ${book.pages}`
	cardButtonLabel.textContent = book.read ? 'Read' : 'Not Read'
	cardReadButton.checked = book.read
	deleteButton.textContent = 'X'

	bookCard.append(cardTitle, cardAuthor, cardPages, buttonContainer)
	buttonContainer.append(cardReadContainer, deleteButton)
	cardReadContainer.append(cardReadButton, cardButtonLabel)
	libraryDisplay.appendChild(bookCard)

	deleteButton.addEventListener('click', (e) => {
		deleteBook(e)
		libraryDisplay.removeChild(bookCard)
	})

	cardReadButton.addEventListener('click', () => {
		if (cardReadButton.checked) {
			cardButtonLabel.textContent = 'Read'
			book.read = true
		} else {
			cardButtonLabel.textContent = 'Not Read'
			book.read = false
		}
	})
}

const deleteBook = (e) => {
	let deleteId = e.target.id

	for (let i = 0; i < library.length; i++) {
		if (parseInt(deleteId) === i) {
			library.splice(i, 1)
			return
		} else {
			return
		}
	}
}

const showErrorMsg = () => {
	const inputs = bookInfoForm.querySelectorAll(
		'input#title, input#author, input#pages'
	)

	// const pattern = /^([1-9]\d{1,3}|10000)$/

	for (const input of inputs) {
		if (input.validity.valueMissing) {
			input.nextElementSibling.style.visibility = 'visible'
		}

		input.addEventListener('input', () => {
			let inputMissing = input.validity.valueMissing

			if (inputMissing) {
				input.nextElementSibling.style.visibility = 'visible'
			} else {
				input.nextElementSibling.style.visibility = 'hidden'
			}

			// if (pattern.test(input.value)) {
			// 	console.log('match')
			// } else {
			// 	console.log('no match')
			// }
		})
	}
}

let formReadButtonStatus = document.querySelector('.form-read-status')

formReadButton.addEventListener('click', () => {
	formReadButton.checked
		? (formReadButtonStatus.textContent = 'Read')
		: (formReadButtonStatus.textContent = 'Not Read')
})

bookInfoForm.addEventListener('submit', (e) => {
	e.preventDefault()

	let isFormValid = bookInfoForm.checkValidity()

	if (isFormValid) {
		addBook()
		formReadButtonStatus.textContent = 'Not Read'
		bookInfoForm.reset()
	} else {
		showErrorMsg()
		return
	}
})
