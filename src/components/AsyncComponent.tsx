//MODULES
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import styled from 'styled-components';

const PageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20000;
`;

//COMPONENT
export type Loader = () => Promise<any>;

export interface AsyncComponentWrapper extends React.FC<any> {
  load: Loader;
}

type AsyncComponentFunctionType = (loader: Loader) => AsyncComponentWrapper;
export const generateAsyncComponent: AsyncComponentFunctionType = (
  loader: Loader
) => {
  let Component: any = null;
  const load: Loader = async () => {
    const ResolvedComponent = await loader();
    Component = ResolvedComponent.default || ResolvedComponent;
  };

  const AsyncComponent: AsyncComponentWrapper = (props: any) => {
    const [Comp, setComponent] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      setLoading(true);
      const fetchComponent = async () => {
        try {
          await load();
          setLoading(false);
          if (Comp !== Component) {
            setComponent(() => Component);
          }
        } catch (err) {
          if (typeof window !== 'undefined') {
            window.alert('Error loading page, please refresh page');
          }
          console.log('ERROR WHILE LOADING PAGE ROUTE', err);
        }
      };

      fetchComponent();
      // eslint-disable-next-line
    }, []);

    if (Component) return <Component {...props} />;
    if (loading) {
      return (
        <PageLoading>
          <LinearProgress />
        </PageLoading>
      );
    }
    if (Comp) return <Comp {...props} />;
    return <div>404 Not Found</div>;
  };

  AsyncComponent.load = async () => {
    const ResolvedComponent = await loader();
    Component = ResolvedComponent.default || ResolvedComponent;
  };

  return AsyncComponent;
};

//DEFAULTS
export default generateAsyncComponent;
