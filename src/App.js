import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Outlet, RouterProvider, createBrowserRouter, useParams } from 'react-router-dom';
import { Categories } from './components/Categories';
import { Subcategory } from './components/Subcategory';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { SearchResult } from './components/SearchResult';
import { SearchProductDetails } from './components/searchprodcutInfo';
import AddSubCategory from './screens/AddSubCategory';
import AddProductDetails from './screens/AddProductDetails';
import AddCategory from './screens/AddCategory';
import { ProductTable } from './components/ProductTable';
import { SearchProvider } from './SearchContext';
import { Navbar } from './screens/Navbar';

function Breadcrumbs() {
  const { category, name, id } = useParams();

  return (
    <nav aria-label="breadcrumb" className='breadcrumb'>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {category && (
          <>
            <li className="breadcrumb-item">
              <Link to={`/${category}`}>{category}</Link>
            </li>
          </>
        )}
        {name && (
          <>
            <li className="breadcrumb-item">
              <Link to={`/${category}/${name}`}>{name}</Link>
            </li>
          </>
        )}
        {id && (
          <>
            <li className="breadcrumb-item active" aria-current="page" >
              {id}
            </li>
          </>
        )}
      </ol>
    </nav>

  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Categories />
        </>
      ),
    },
    {
      path: '/:category',
      element: (
        <>
          <Breadcrumbs />
          <Subcategory />
        </>
      ),
    },
    {
      path: '/:category/:name',
      element: (
        <>
          <Breadcrumbs />
          <ProductList />
        </>
      ),
    },
    {
      path: '/:category/:name/:id',
      element: (
        <>
          <Breadcrumbs />
          <ProductDetails/>
        </>
      ),
    },
    {
      path: '/searchresult',
      element: (
        <>
          <Breadcrumbs />
          <SearchResult />
        </>
      ),
    },
    // {
    //   path: '/search',
    //   element: (
    //     <>
    //       <Breadcrumbs />
    //       <Search />
    //     </>
    //   ),
    // },
    {
      path: '/searchresult/:id',
      element: (
        <>
          <Breadcrumbs />
          <SearchProductDetails />
        </>
      ),
    },
    {
      path: '/addsubcategory',
      element: <AddSubCategory />,
    },
    {
      path: '/addproductdetails',
      element: <AddProductDetails />,
    },
    {
      path: '/addcategory',
      element: <AddCategory />
    },

    , {
      path: '/table',
      element: <ProductTable />
    }

  ]);
  return (
    <SearchProvider>
      <>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>

      </>
    </SearchProvider>
  );
}

export default App;
