import testService from "../services/testService.js";

class TestController {
    async createTest(req, res, next) {
        try {
            const { questions, topicId, withTimer, testType } = req.body;
            const test = await testService.createTest(questions, topicId, withTimer, testType);
            return res.json(test);
        } catch (e) {
            next(e);
        }
    }

    async getTest(req, res, next) {
        try {
            const { topicId } = req.params;
            const test = await testService.getTest(topicId);
            return res.json(test);
        } catch (e) {
            next(e);
        }
    }

    async getAllTests(req, res, next) {
        try {
            const tests = await testService.getAllTests();
            return res.json(tests);
        } catch (e) {
            next(e);
        }
    }
}

export default new TestController();