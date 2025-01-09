export default class UserStatisticsDto {
    bestTime;
    coveredTopicsCount;
    correctAnswersCount;
    totalAnswersCount;

    constructor(model) {
        this.bestTime = model.bestTime;
        this.coveredTopicsCount = model.coveredTopicsCount;
        this.correctAnswersCount = model.correctAnswersCount;
        this.totalAnswersCount = model.totalAnswersCount;
    }
}