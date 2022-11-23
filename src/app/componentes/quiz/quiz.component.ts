import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = "";
  questions:any = ""
  questionSelected:any = "";
  answers:string[] = [];
  answerSelected:string =""
  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  botaoPressionado(value:string){
    this.answers.push(value)
    this.proximoPasso()
  }

 async proximoPasso(){
  this.questionIndex += 1
  if(this.questionMaxIndex > this.questionIndex ){
    this.questionSelected = this.questions[this.questionIndex]
  }else{
    const respostaFinal:string = await this.getAnswer(this.answers)
    this.finished = true
    this.answerSelected = quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results]
  }
 }
 async getAnswer(answers: string[]){
  const result = answers.reduce((anterior, atual, index, array) => {
    if(array.filter(item => item=== anterior).length > array.filter(item => item === atual).length
    ){
      return anterior
    }else{
      return atual
    }
  }) 
  return result
}  
}