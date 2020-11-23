import React, { useState, useMemo } from 'react';
import { parseDOTNetwork } from 'vis-network/standalone';
import styled from 'styled-components';
import './App.css';
import { GraphViz } from './GraphViz';

const Panels = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 0;
  height: calc(100vh - 170px);
`

const Panel = styled.div`
  display: flex;
`

const LeftPanel = styled(Panel)`
  width: 35%;

  textarea {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const RightPanel = styled(Panel)`
  width: 65%;
  background: #f4f4f4;
`

const Warning = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid #ffbc00;
  background: #fff5d9;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
`

const defaultDot =
`// Paste your graphviz input here

digraph G {
  "foo_a" -> "foo_b"
  "foo_a" -> "foo_c"
  
  "foo_b" -> "foo_c"
  "foo_b" -> "foo_e"
  
  "foo_c" -> "foo_e"
}`;

function App() {
  const [dot, setDot] = useState(defaultDot);
  const [hasInputError, setHasInputError] = useState(false);

  const data = useMemo(() => {
    let parsed
    try {
      parsed = parseDOTNetwork(dot);

      return parsed
    } catch (e) {
      console.error(e);
      setHasInputError(true);
      
      return undefined;
    }
  }, [dot]);
  
  const onChangeDot = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasInputError(false);
    setDot(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React vis-network</h1>
      </header>
      { hasInputError &&
        <Warning>Input not valid</Warning>
      }
      <Panels>
        <LeftPanel>
          <textarea value={dot} onChange={onChangeDot}></textarea>
        </LeftPanel>
        <RightPanel>
          <GraphViz data={data} />
        </RightPanel>
      </Panels>
    </div>
  );
}

export default App;
