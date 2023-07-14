import React, {useEffect, useState} from 'react';
import Palette from './Palette';
import Page from './Page';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import { Route, Routes, useParams, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles/App.css';


function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const location = useLocation();

  useEffect(() => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }, [palettes]);

  const findPalette = (id) => (
    palettes.find(palette => (
      palette.id === id
    ))
  );

  const PaletteWrapper = () => {
    const {id} = useParams();
    return <Palette palette={generatePalette(findPalette(id))} />
  }
  
  const SPPaletteWrapper = () => {
    const {paletteId, colorId} = useParams();
    return <SingleColorPalette colorId={colorId} palette={generatePalette(findPalette(paletteId))} />
  }

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  }

  return (
    <TransitionGroup location={location}>
      <CSSTransition key={location.key} classNames='page' timeout={500}>
        <Routes location={location}>
          <Route
            index
            path='/'
            element={
              <Page>
                <PaletteList 
                palettes={palettes}
                deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path='palette/:id'
            element={
              <Page>
                <PaletteWrapper />
              </Page>
            }
          />
          <Route
            path='palette/:paletteId/:colorId'
            element={
              <Page>
                <SPPaletteWrapper />
              </Page>
            }
          />
          <Route
              path='palette/new'
              element={
                <Page>
                  <NewPaletteForm 
                    savePalette={savePalette} 
                    palettes={palettes}
                  />
                </Page>
              }
          />
          <Route
            path='*'
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
