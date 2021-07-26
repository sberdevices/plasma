import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    customSnapshotsDir: Cypress.env('snapshotsDir'),
});
