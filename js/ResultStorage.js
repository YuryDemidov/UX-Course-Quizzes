export class ResultsStorage {
  saveResult(quizNumber, value) {
    if (!this.getResult(quizNumber, `number`) || this.resultToNumber(value) > this.getResult(quizNumber, `number`)) {
      localStorage.setItem(`Quiz ${quizNumber}`, value);
    }
  }

  getResult(quizNumber, format) {
    let result = localStorage.getItem(`Quiz ${quizNumber}`);
    switch (format) {
      case `string`:
        return result;
      case `number`:
      default:
        return this.resultToNumber(result);
    }
  }

  resultToNumber(result) {
    switch (typeof result) {
      case `number`:
        return result;
      case `string`:
        let fractions = result.split(`/`);
        return fractions[0] / fractions[1];
      default:
        return false;
    }
  }
}
