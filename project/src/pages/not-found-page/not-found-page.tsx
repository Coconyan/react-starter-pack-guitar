import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <h1>404 Not found</h1>
        <Link to={AppRoute.Root}> go home</Link>
      </main>
      <Footer />
    </div>

  );
}

export default NotFoundPage;
