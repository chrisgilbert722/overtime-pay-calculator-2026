import { useState } from 'react';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { ResultsPanel } from './components/ResultsPanel';
import { ScenarioControls } from './components/ScenarioControls';
import { AdContainer } from './components/AdContainer';
import { BreakdownTable } from './components/BreakdownTable';
import { SEOText } from './components/SEOText';
import { Footer } from './components/Footer';
import { calculateOvertime } from './logic/overtimeCalculations';
import type { OvertimeInput } from './logic/overtimeCalculations';

function App() {
  const [values, setValues] = useState<OvertimeInput>({
    hourlyRate: 25,
    regularHours: 40,
    overtimeHours: 10,
    state: 'TX',
    overtimeMultiplier: 1.5,
    includeDoubleTime: false,
    doubleTimeHours: 0
  });

  const handleChange = (field: keyof OvertimeInput, value: number | boolean | string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const result = calculateOvertime(values);

  return (
    <>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* 1) HEADER */}
        <Header />

        {/* 2) INPUT CARD */}
        <InputCard values={values} onChange={handleChange} />

        {/* 3) RESULTS PANEL */}
        <ResultsPanel result={result} />

        {/* 4) SCENARIO CONTROLS */}
        <ScenarioControls values={values} onChange={handleChange} />

        {/* 5) NATIVE AD */}
        <AdContainer slotId="native-slot-placeholder" sticky={false} />

        {/* 6) BREAKDOWN TABLE */}
        <BreakdownTable result={result} includeDoubleTime={values.includeDoubleTime} />

        {/* 7) SEO TEXT */}
        <SEOText />

        {/* 8) FOOTER */}
        <Footer />

        {/* 9) STICKY FOOTER AD */}
        <AdContainer slotId="sticky-footer-placeholder" sticky={true} />

      </main>
    </>
  );
}

export default App;
