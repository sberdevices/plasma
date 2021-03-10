const path = require("path");
const fs = require("fs");
const xml2js = require("xml2js");
const fetch = require("node-fetch");

const reArgPrefix = /^(--)/i;
const { argv, env } = process;
const { PWD } = env;
const coverageFilePath = path.resolve(PWD, "coverage/clover.xml");
const badgeConfig = [
    { color: "red", ">=": 0, "<": 30 },
    { color: "orange", ">=": 30, "<": 40 },
    { color: "yellow", ">=": 40, "<": 60 },
    { color: "yellowgreen", ">=": 60, "<": 70 },
    { color: "green", ">=": 70, "<": 90 },
    { color: "brightgreen", ">=": 90, "<=": 100 },
];

function parseArg(arg) {
    return arg.replace(reArgPrefix, "").split("=");
}

async function percentege(filePath, type) {
    try {
        const xmlFile = fs.readFileSync(filePath);

        const xmlFileData = await xml2js.parseStringPromise(xmlFile);
        const metrics = xmlFileData.coverage.project[0].metrics[0].$;

        const total = parseInt(metrics[type]);
        const covered = parseInt(metrics[`covered${type}`]);

        if (total == 0) {
            return 0;
        }

        const coverageRatio = covered / total;

        return parseFloat((coverageRatio * 100).toFixed(2));
    } catch (_error) {
        console.log("Coverage file does not exist");

        process.exit(0);
    }
}

function getColor(coverage) {
    const configsFound = badgeConfig
        .filter((config) => !config[">="] || (config[">="] && coverage >= config[">="]))
        .filter((config) => !config["<="] || (config["<="] && coverage <= config["<="]))
        .filter((config) => !config[">"] || (config[">"] && coverage > config[">"]))
        .filter((config) => !config["<"] || (config["<"] && coverage < config["<"]))
        .map((config) => config.color);
    return configsFound.shift();
}

function schema(coveragePercentage, showJestLogo) {
    let color = getColor(coveragePercentage);

    if (!color) color = "blue";

    const schema = {
        schemaVersion: 1,
        label: "coverage",
        message: `${coveragePercentage}%`,
        color: color,
    };

    if (showJestLogo) {
        schema.namedLogo = "jest";
    }

    return schema;
}

function isUrlValid(url) {
    return /^https:\/\/api\.keyvalue\.xyz\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(url);
}

function invariant(condition, message) {
    if (condition) {
        console.log(message);

        process.exit(0);
    }
}

/**
 * Для использования онного скрипта надо:
 * 1. `$ curl -X POST https://api.keyvalue.xyz/new/myKey` -> получить урл формата https://api.keyvalue.xyz/<keyId>/myKey
 * 2. в package.json пакета добавить скрипт coverage со следующей командой
 * `node ../../scripts/updateCoverage.js --url={урл из п1}`
 * 3. Добавить в README.md бейджик
 * `![](https://img.shields.io/endpoint?url={урл из п1})`
 * 4. ???
 * 5. Профит, теперь на каждом ПРе будет обновяться процент покрытия тестами
 *
 * Доступные аргументы
 * @param --url* - ссылка до счетчика на keyvalue.xyz
 * @param --type - 'statements', 'methods', 'conditionals'
 * @param --withLogo - 0 | 1 - показывать лого Jest или нет
 *
 * (*) - обязательный аргумент
 */
(async function updateCoverage() {
    const args = argv.reduce(
        (acc, arg) => {
            if (reArgPrefix.test(arg)) {
                const [key, value] = parseArg(arg);

                acc[key] = value;
            }

            return acc;
        },
        {
            type: "statements",
            withLogo: 0,
        }
    );

    invariant(
        !args.url || !isUrlValid(args.url),
        "You must pass `--url` argument\n ex. `node ./updateCoverage.js --url=https://api.keyvalue.xyz/<keyId>/coverage`"
    );
    invariant(
        !["statements", "methods", "conditionals"].includes(args.type),
        "You must pass `--type` argument\n ex. `node ./updateCoverage.js --type=methods`"
    );

    const coveragePercentege = await percentege(coverageFilePath, args.type);
    const body = schema(coveragePercentege, args.withLogo);

    await fetch(args.url, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "text/plain" },
    });
})();
