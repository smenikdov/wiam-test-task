import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PersonalData from './pages/PersonalData';
import AddressData from './pages/AddressData';
import LoanData from './pages/LoanData';
import NotFound from './pages/NotFound';

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Navigate to="/form/personal" replace />} />
                        <Route path="/form/personal" element={<PersonalData />} />
                        <Route path="/form/address" element={<AddressData />} />
                        <Route path="/form/loan" element={<LoanData />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
