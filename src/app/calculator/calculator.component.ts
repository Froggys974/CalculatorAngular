import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  calcVal: string = ''; 
  prevCalcVal: string = '';
  operators: string | null = null;
  calculEnd: boolean = false;
  calcBtns = [
    "C",
    "%",
    "=",
    "+",
    7,
    8,
    9,
    "-",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "/",
    0,
    ".",
  ];

  handleClick(btn: string | number) {
    let updatedCalcVal = this.calcVal;

    if (!isNaN(Number(btn)) || btn === ".") {
      if (this.calculEnd) {
        updatedCalcVal = btn.toString();
        this.calculEnd = false;
      } else {
        updatedCalcVal += btn;
      }
    }
    if (btn === "C") {
      this.emptyDisplay();
      return; // Return here to prevent further execution
    }
    if (btn === "=") {
      this.calculateResult();
      return; // Return here to prevent further execution
    }
    if (btn === "%") {
      updatedCalcVal = (parseFloat(updatedCalcVal) / 100).toString();
    }
    if (["/", "+", "-", "*"].includes(btn.toString())) {
      this.operators = btn.toString();
      this.prevCalcVal = updatedCalcVal;
      updatedCalcVal = "";
    }
    this.calcVal = updatedCalcVal;
  }

  getCalcVal(): string {
    return this.calcVal;
  }

  isOperator(btn: string | number): boolean {
    return ["C", "*", "/", "+", "-", "=", "%"].includes(btn.toString());
  }

  calculateResult() {
    try {
      let result = eval(this.prevCalcVal + this.operators + this.calcVal).toString();
      this.calcVal = result;
      this.prevCalcVal = "";
      this.operators = null;
      this.calculEnd = true;
    } catch (error) {
      this.calcVal = "Error";
    }
  }

  emptyDisplay() {
    this.calcVal = "";
    this.prevCalcVal = "";
    this.operators = null;
  }
}