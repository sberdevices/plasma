/// <reference types="cypress" />
import type { navigate } from './commands';

declare global {
    export namespace Cypress {
        interface Chainable {
            /**
             * @param dir {navigate | navigate[]} Эвент который нужно вызвать
             * @param opts {Patial<Cypress.TypeOptions> & { times?: number }}
             */

            sendNavigateAction(
                dir: navigate | navigate[],
                opts?: Partial<Cypress.TypeOptions> & {
                    times?: number;
                },
            ): Chainable;
        }
    }
}

export { navigate };
