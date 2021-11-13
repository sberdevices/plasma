const {
    createSaluteRequest,
    createSaluteResponse,
    createScenarioWalker,
    createSystemScenario,
} = require("@salutejs/scenario");
const { SaluteMemoryStorage } = require("@salutejs/storage-adapter-memory");

const scenarioWalker = createScenarioWalker({
    systemScenario: createSystemScenario({
        RUN_APP: ({ res, req }) => {
            res.setPronounceText("начнем");

            const { payload } = req.request;

            const userData = {
                projectName: payload.projectName,
                device: payload.device,
                app_info: payload.app_info,
            };

            res.appendCommand({
                type: "sub",
                payload: {
                    sub: req.request.uuid.sub,
                    ...userData,
                },
            });
        },
    }),
});

const storage = new SaluteMemoryStorage();

module.exports = async ({ body }, response) => {
    const req = createSaluteRequest(body);
    const res = createSaluteResponse(body);

    const sessionId = body.uuid.userId;
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });

    response.status(200).json(res.message);
};
