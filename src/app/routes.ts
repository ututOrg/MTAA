    import { createBrowserRouter } from 'react-router';
    import Root from './Root';
    import Dashboard from './pages/Dashboard';
    import Production from './pages/Production';
    import Zorilgo from './pages/Zorilgo';
    import Chiglel from './pages/Chiglel';
    import Zorilt from "./pages/Zorilt";

    export const router = createBrowserRouter([
      {
        path: '/',
        Component: Root,
        children: [
          { index: true, Component: Dashboard },
          { path: 'production', Component: Production },
          { path: 'logistics', Component: Zorilgo },
          { path: 'sales', Component: Chiglel },
            { path: 'pov', Component: Zorilt },
        ],
      },
    ]);
