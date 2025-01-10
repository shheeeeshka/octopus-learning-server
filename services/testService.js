import Test from "../models/test-model.js";
import TestQuestion from "../models/test-question-model.js";
import TestAnswer from "../models/test-answer-model.js";

class TestService {
    async createTest(questions = [], moduleId = "", withTimer = false, testType = "default") {
        const newTest = await Test.create({ moduleId, withTimer, type: testType }).catch(() => null);

        const createdQuestions = await Promise.all(questions.map(async (q) => {
            const newQuestion = await TestQuestion.create({
                question: q.question,
                hint: q.hint,
                testId: newTest._id,
            });

            await Promise.all(q.answers.map(async (a) => {
                await TestAnswer.create({
                    answer: a.answer,
                    isCorrect: a.isCorrect,
                    questionId: newQuestion._id,
                });
            }));

            return newQuestion;
        }));

        return { newTest: newTest, createdQuestions: createdQuestions };
    }

    async getTest(moduleId = "") {
        const test = await Test.findOne({ moduleId }).catch(() => null);
        if (!test) return null;

        const questions = await TestQuestion.find({ testId: test._id }).catch(() => null);
        if (!questions) return null;

        const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
            const answers = await TestAnswer.find({ questionId: question._id }).catch(() => null);
            return {
                question: question.question,
                hint: question.hint,
                answers: answers.map(answer => ({
                    answer: answer.answer,
                    isCorrect: answer.isCorrect
                }))
            };
        }));

        return {
            moduleId: test.moduleId,
            withTimer: test.withTimer,
            type: test.type,
            questions: questionsWithAnswers
        };
    }

    async getAllTests() {
        const tests = await Test.find().catch(() => null);
        if (!tests) return null;

        const allTests = await Promise.all(tests.map(async (test) => {
            const questions = await TestQuestion.find({ testId: test._id }).catch(() => null);
            const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
                const answers = await TestAnswer.find({ questionId: question._id }).catch(() => null);
                return {
                    question: question.question,
                    hint: question.hint,
                    answers: answers.map(answer => ({
                        answer: answer.answer,
                        isCorrect: answer.isCorrect
                    }))
                };
            }));

            return {
                moduleId: test.moduleId,
                withTimer: test.withTimer,
                type: test.type,
                questions: questionsWithAnswers
            };
        }));

        return allTests;
    }

    async deleteTest(testId = "") {
        const test = await Test.findOne({ _id: testId }).catch(() => null);
        if (!test) return null;

        const questions = await TestQuestion.find({ testId: test._id }).catch(() => null);
        if (questions) {
            await Promise.all(questions.map(async (question) => {
                await TestAnswer.deleteMany({ questionId: question._id }).catch(() => null);
            }));

            await TestQuestion.deleteMany({ testId: test._id }).catch(() => null);
        }

        const deletedTest = await Test.findOneAndDelete({ _id: testId }).catch(() => null);
        return deletedTest;
    }
}

export default new TestService();

// const testData = {
//     moduleId: "12345",
//     withTimer: true,
//     type: "quiz",
//     questions: [
//         {
//             question: "Какой язык программирования используется для разработки веб-приложений?",
//             hint: "Это язык, который часто используется с HTML и CSS.",
//             answers: [
//                 { answer: "JavaScript", isCorrect: true },
//                 { answer: "Python", isCorrect: false }
//             ]
//         },
//         {
//             question: "Что такое MongoDB?",
//             hint: "Это NoSQL база данных.",
//             answers: [
//                 { answer: "База данных", isCorrect: true },
//                 { answer: "Система управления версиями", isCorrect: false }
//             ]
//         }
//     ]
// };

// const newTest = await testService.createTest(questions, moduleId);