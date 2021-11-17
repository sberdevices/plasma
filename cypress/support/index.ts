import './commands';
import '@cypress/code-coverage/support';
// по какой-то причине axe подключается только через require
// иначе не поднимается dev-server webpack'а
require('cypress-axe');

// формирование красивого вывода отчета axe в консоль
function terminalLog(violations) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
            violations.length === 1 ? 'was' : 'were'
        } detected`,
    );
    // pluck specific keys to keep the table readable
    const violationData = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
    }));

    cy.task('table', violationData);
}

// axe пока плохо работает для тестов на сторибуке
// потому нужна такая проверка
if (Cypress.env('a11yCheck')) {
    // перед каждым тестом инициируем axe
    beforeEach('a11y initial', () => {
        cy.injectAxe();
    });

    afterEach('a11y check', () => {
        // первый параметр - элемент, который нужно проверить, селектор может выбирать несколько
        // третий параметр управляет выводом
        // последний параметр не роняет тест, если есть ошибки a11y
        cy.checkA11y('#__cy_root *', null, terminalLog, { skipFailures: true });
    });
}
