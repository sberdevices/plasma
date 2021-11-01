import React from 'react';
import { Badge } from '@sberdevices/plasma-web';

/**
 * Тестовое описание
 */
export default function App() {
    return (
        <div>
            <Badge text="ХМХМХМХМ" size="l" view="primary" />
            <Badge text="Бейдж" size="l" view="secondary" />
            <Badge text="Бейдж" size="l" view="success" />
            <Badge text="Бейдж" size="l" view="warning" />
            <Badge text="Бейдж" size="l" view="critical" />
        </div>
    );
}
