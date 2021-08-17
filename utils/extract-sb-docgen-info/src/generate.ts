import program from 'commander';
import path from 'path';
import leven from 'leven';
import { sync } from 'read-pkg-up';

import { extract } from './extract';

const pkg = sync({ cwd: __dirname })?.packageJson;
const version = pkg?.version || '0.0.0';
const logger = console;

program
    .command('extract [location] [output]')
    .description('extract docgenInfo.json from a built version')
    .action((location = 'build-sb', output = path.join(location, 'docgenInfo.json')) =>
        extract(location, output).catch((e) => {
            logger.error(e);
            process.exit(1);
        }),
    );

program.on('command:*', ([invalidCmd]) => {
    logger.error(' Invalid command: %s.\n See --help for a list of available commands.', invalidCmd);
    // eslint-disable-next-line no-underscore-dangle
    const availableCommands = program.commands.map((cmd) => cmd._name);
    const suggestion = availableCommands.find((cmd) => leven(cmd, invalidCmd) < 3);
    if (suggestion) {
        logger.log(`\n Did you mean ${suggestion}?`);
    }
    process.exit(1);
});

program.usage('<command> [options]').version(version).parse(process.argv);

if (program.rawArgs.length < 3) {
    program.help();
}
