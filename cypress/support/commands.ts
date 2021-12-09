import { dirxml, time } from 'console';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    customSnapshotsDir: Cypress.env('snapshotsDir'),
});

const { isPlainObject, last } = Cypress._;

/**
 * Adds command "cy.waitForResources(name1, name2, ...)"
 * that checks performance entries for resources that end with the given names.
 * This command will be available in every spec file.
 *
 * @example cy.waitForResources('base.css', 'app.css')
 *
 * You can pass additional options, like "timeout"
 *
 * @example cy.waitForResources('base.css', 'app.css', { timeout: 3000 })
 */
Cypress.Commands.add('waitForResources', (...args) => {
    let names;
    let options;

    if (isPlainObject(last(args))) {
        names = args.slice(0, args.length - 1);
        options = last(args);
    } else {
        names = args;
        options = {};
    }

    const log = false; // let's not log inner commands
    const timeout = options.timeout || Cypress.config('defaultCommandTimeout');

    cy.log(`Waiting for resources ${names.join(', ')}`);

    cy.window({ log }).then(
        // note that ".then" method has options first, callback second
        // https://on.cypress.io/then
        { log, timeout },
        (win) => {
            return new Cypress.Promise((resolve, reject) => {
                // flag set when we find all names
                let foundResources;

                // control how long we should try finding the resource
                // and if it is still not found. An explicit "reject"
                // allows us to show nice informative message

                const interval = setInterval(() => {
                    foundResources = names.every((name) => {
                        return win.performance.getEntriesByType('resource').find((item) => item.name.endsWith(name));
                    });

                    if (!foundResources) {
                        // some resource not found, will try again
                        return;
                    }

                    cy.log('Found all resources');
                    clearInterval(interval);
                    resolve();
                }, 100);

                setTimeout(() => {
                    if (foundResources) {
                        // nothing needs to be done, successfully found the resource
                        return;
                    }

                    clearInterval(interval);
                    reject(new Error(`Timed out waiting for resources ${names.join(', ')}`));
                }, timeout);
            });
        },
    );
});

export enum navigate {
    LEFT = '{leftarrow}',
    UP = '{uparrow}',
    RIGHT = '{rightarrow}',
    DOWN = '{downarrow}',
    ENTER = '{enter}',
}

type SendNavigatioActionParams = Partial<Cypress.TypeOptions> & {
    times?: number;
};

Cypress.Commands.add('sendNavigateAction', (dir: navigate, opts: SendNavigatioActionParams = {}) => {
    const times = opts?.times ?? 1;
    const sequence = Array.isArray(dir) ? dir : Array(times).fill(dir);

    const options = {
        delay: 350, // анимация перемещения фокуса
        waitForAnimation: true,
        ...opts,
    };

    return sequence.reduce<Cypress.Chainable>((acc, key) => {
        return acc.type(key, options);
    }, cy.get('body'));
});
