import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            isAddCardVisible: false,
            isWarningMessageVisible: false,
            flashCards: [],
            question: '',
            answer: '',
            editingCard: undefined
        }
    },
    methods: {
        showAddCard() {
            this.isAddCardVisible = true
        },
        closeAddCard() {
            this.isAddCardVisible = false
        },
        toggleAnswerVisibility(flashcard) {
            flashcard.showAnswer = !flashcard.showAnswer
        },
        deleteCard(flashcard) {
            console.log("Delete: ", flashcard)
            this.flashCards = this.flashCards.filter(card => card != flashcard)
        },
        editCard(flashCard) {
            this.editingCard = flashCard // Hemos cambiado el estado de nuestra aplicación para informar que estamos en modo edición y además estamos editando 'flashCard'
            this.question = flashCard.question
            this.answer = flashCard.answer
        },
        addNewCard() {
            console.log('answer: ', this.answer)
            console.log('question:', this.question)

            // Debemos controlar que, si this.answer o this.question no tienen valor en este punto, debemos impedir el añadir elemento alguno al array
            // 1. Mostrar el mensaje de error (ya está definido en el HTML pero actualemnte está oculto)
            if (!this.answer || !this.question) {
                this.isWarningMessageVisible = true
                // 2. DEtener inmediatamente la ejecución de la función
                return
            }

            // Si estamos en modo edición, tenemos que
            // 1. Copiar los valores del formulario a la tarjeta que estamos editando
            // 2. PAsar a modo "no edición" (añadir tarjeta nueva)
            if (this.editingCard) {

                this.editingCard.question = this.question
                this.editingCard.answer = this.answer
                this.editingCard = undefined
                this.isWarningMessageVisible = false
                this.question = ""
                this.answer = ""

                return

            }

            // Crear un objeto con dos propiedades: answer y question
            // El valor de dichas propiedades tiene que ser exactamente el valor que recuperamos en this.answer y this.question
            const newCard = {
                question: this.question,
                answer: this.answer,
                showAnswer: false
            }
            // Añadir dicho objeto al arrya flashCards
            this.flashCards.unshift(newCard)

            console.log(this.flashCards)
            // Limpiar los campos del formulario
            this.question = ''
            this.answer = ''
            this.isWarningMessageVisible = false
        }
    }
})

app.mount('#app')