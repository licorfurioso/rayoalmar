import { Header } from './components/Header/Header';
import { PhotoSessions } from './sections/PhotoSessions/PhotoSessions';
import { Shoots } from './sections/Shoots/Shoots';
import { Sketchup } from './sections/Sketchup/Sketchup';
import { AboutMe } from './sections/AboutMe/AboutMe';
import { useActiveSection } from './hooks/useActiveSection';
import './App.css';

function App() {
  const activeSection = useActiveSection([
    'photo-sessions',
    'shoots',
    'sketchup',
    'about-me',
  ]);

  return (
    <>
      <Header activeSection={activeSection} />
      <main className="app">
        <PhotoSessions />
        <Shoots />
        <Sketchup />
        <AboutMe />
      </main>
    </>
  );
}

export default App;
