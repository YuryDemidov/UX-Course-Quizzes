'use strict';

import {ResultsStorage} from './ResultStorage.js';

let resultCache = new ResultsStorage();

function getPageName() {
  return location.pathname.split(`/`).slice(-1).pop();
}

function getQuizNumber() {
  let pageName = getPageName();
  if (pageName.includes(`quiz-`)) {
    let quizNumber = pageName.slice(pageName.indexOf(`quiz-`) + 5);
    for (let char of quizNumber) {
      if (isNaN(+char) && char !== '-') {
        return quizNumber.slice(0, quizNumber.indexOf(char));
      }
    }
    return quizNumber;
  }
}

function getQuizResult() {
  const resultsHeadings = document.querySelectorAll(`#quiz_wrap h1`);
  let resultRegEx = /: \d+\/\d+/;
  let isFinalStep = false;
  let result = ``;

  if (!resultsHeadings) {
    return false;
  }

  resultsHeadings.forEach((heading) => {
    if (heading.textContent.match(resultRegEx)) {
      isFinalStep = true;
      result = heading.textContent.slice(heading.textContent.indexOf(`: `) + 2);
    }
  });
  if (!isFinalStep) {
    return false;
  }
  return result;
}

function colorizeOutput(output, coefficient) {
  output.style.color = `rgb(${(1 - coefficient) * 255}, ${coefficient * 255}, 20)`;
}

function printQuizzesResults() {
  const quizzesResultOutputs = document.querySelectorAll(`.lessons-list__result`);
  if (quizzesResultOutputs) {
    quizzesResultOutputs.forEach(output => {
      let resultStr = resultCache.getResult(output.dataset.quiz, `string`);
      if (resultStr) {
        colorizeOutput(output, resultCache.getResult(output.dataset.quiz, `number`));
        output.textContent = `Best result: ${resultStr}`;
      }
    })
  }
}

document.addEventListener(`click`, () => {
  let quizResult = getQuizResult();
  let quizNumber = getQuizNumber();
  if (quizResult && quizNumber) {
    resultCache.saveResult(quizNumber, quizResult);
  }
});

document.addEventListener(`DOMContentLoaded`, () => {
  printQuizzesResults();
});
