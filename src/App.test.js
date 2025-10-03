import { render } from '@testing-library/react';
import { LanguageProvider } from './contexts/LanguageContext';

test('renders without crashing', () => {
  const { container } = render(
    <LanguageProvider>
      <div>Test</div>
    </LanguageProvider>
  );
  expect(container).toBeTruthy();
});
