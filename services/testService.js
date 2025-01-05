import Test from "../models/test-model.js";

class TestService {
    async createTest(questions = [], moduleId = "", withTimer = false, testType = "default") {
        const newTest = await Test.create({ questions, moduleId, withTimer, type: testType }).catch(() => null);
        return newTest;
    }

    async getTest(moduleId = "") {
        const test = await Test.findOne({ moduleId }).catch(() => null);
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

// const newTest = await testService.createTest(questions, moduleId);