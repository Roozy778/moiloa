import React, { useEffect, useState } from 'react';
import './styles.css';
import ProductManagement from './ProductManagement';
import UsersManagement from './UsersManagement';
import Dashboard from './Dashboard';
import Login from './Login';
import Logout from './Logout'; 

function App() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
        const loginStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loginStatus === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    const showSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const updateProduct = (index, updatedProduct) => {
        const updatedProducts = products.map((product, i) =>
            i === index ? updatedProduct : product
        );
        setProducts(updatedProducts);
    };

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    };

    return (
        <div>
            <header>
                <h1>WINGS CAFE INVENTORY SYSTEM - LIMKOKWING UNIVERSITY</h1>
            </header>

            {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <>
                    <nav>
                        <button
                            className={activeSection === 'dashboard' ? 'active' : ''}
                            onClick={() => showSection('dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={activeSection === 'productManagement' ? 'active' : ''}
                            onClick={() => showSection('productManagement')}
                        >
                            Product Management
                        </button>
                        <button
                            className={activeSection === 'usersManagement' ? 'active' : ''}
                            onClick={() => showSection('usersManagement')}
                        >
                            Users Management
                        </button>
                        <button onClick={handleLogout}>Logout</button> 
                    </nav>
                    <main>
                        {activeSection === 'dashboard' && <Dashboard products={products} />}
                        {activeSection === 'productManagement' && (
                            <ProductManagement
                                products={products}
                                addProduct={addProduct}
                                updateProduct={updateProduct}
                                deleteProduct={deleteProduct}
                            />
                        )}
                        {activeSection === 'usersManagement' && <UsersManagement />}
                    </main>
                </>
            )}
        </div>
    );
}

export default App;
