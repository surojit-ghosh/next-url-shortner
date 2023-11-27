import Wrapper from './components/Wrapper.jsx';

export default async function DashboardLayout({ children }) {
    return (<>
        <Wrapper>{children}</Wrapper>
    </>
    );
};