import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            isAddCardVisible: false,
            isWarningMessageVisible: false,
            flashCards:[],
            question: '',
            answer: '',
            editingCard: undefined
        }
    },
   
    methods:{
        showAddCard(){
            this.isAddCardVisible = true
        },
        closeAddCard(){
            this.isAddCardVisible = false
        },
        toggleAnswerVisibility(flashcard){
            //flashcard is each object in the array flashCards
            flashcard.showAnswer = !flashcard.showAnswer
        },
        deleteCard(flashcard){
            this.flashCards = this.flashCards.filter(card => card != flashcard)
        },
        editCard(myFlashCard){
            this.editingCard = flashCard // Hemos cambiado el estado de nuestra aplicación para informar que estamos en modo edición y además estamos editando 'flashCard'
            this.question = flashCard.question
            this.answer = flashCard.answer

        },
        addNewCard(){
            if (!this.answer || !this.question) {
                this.isWarningMessageVisible = true
                return
            }

            if (this.editingCard) {
                this.editingCard.question = this.question
                this.editingCard.answer = this.answer
                this.editingCard = undefined     
                this.isWarningMessageVisible = false
                this.question = ""
                this.answer = ""
                return
            }

            const newCard = {
                question: this.question,
                answer: this.answer,
                showAnswer: false
            }
            this.flashCards.unshift(newCard)
            this.question =''
            this.answer=''
            this.isWarningMessageVisible = false

        },
       
    }
})

app.mount('#app')