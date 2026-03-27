    import { createBrowserRouter } from 'react-router';
    import Root from './Root';
    import Dashboard from './pages/Dashboard';
    import Production from './pages/Production';
    import Logistics from './pages/Logistics';
    import Sales from './pages/Sales';
    import Zorilt from "./pages/Zorilt";

    export const router = createBrowserRouter([
      {
        path: '/',
        Component: Root,
        children: [
          { index: true, Component: Dashboard },
          { path: 'production', Component: Production },
          { path: 'logistics', Component: Logistics },
          { path: 'sales', Component: Sales },
            { path: 'pov', Component: Zorilt },
        ],
      },
    ]);
