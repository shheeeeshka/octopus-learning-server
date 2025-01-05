import Test from "../models/test-model.js";

class TestService {
    async createTest(questions = [], topicId = "", withTimer = false, testType = "default") {
        const newTest = await Test.create({ questions, topicId, withTimer, type: testType }).catch(() => null);
        return newTest;
    }

    async getTest(topicId = "") {
        const test = await Test.findOne({ topicId }).catch(() => null);
        return test;
    }

    async getAllTests() {
        const tests = await Test.find().catch(() => null);
        return tests;
    }
}

export default new TestService();

// const questions = [
//     { value: "Вопрос 1", isCorrect: true },
//     { value: "Вопрос 2", isCorrect: false },
//     { value: "Вопрос 3", isCorrect: true },
// ];

// const newTest = await testService.createTest(questions, topicId);