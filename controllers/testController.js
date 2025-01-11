import testService from "../services/testService.js";

class TestController {
    async createTest(req, res, next) {
        try {
            const { questions, moduleId, timer, testType } = req.body;
            const test = await testService.createTest(questions, moduleId, timer, testType);
            return res.json(test);
        } catch (e) {
            next(e);
        }
    }

    async getTest(req, res, next) {
        try {
            const { moduleId } = req.params;
            const test = await testService.getTest(moduleId);
            console.log({ test });
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