import { RequireAuth } from '../../contexts/RequireAuth';
import Sidebar from './Sidebar';

type DefaultPageProps = {
  children: React.JSX.Element | React.JSX.Element[]; // Renderiza um elemento ou um array de elementos JSX
};

const DefaultPage = ({ children }: DefaultPageProps) => {
  return (
    <RequireAuth>
      <div className="flex">
        <Sidebar />
        <div className="py-7 w-full space-y-8 lg:px-5 2xl:px-14 font-source-sans">
          {children}
        </div>
      </div>
    </RequireAuth>
  );
};

export default DefaultPage;
