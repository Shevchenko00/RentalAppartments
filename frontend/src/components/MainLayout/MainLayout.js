import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import './MainLatout.scss'
import MotionForPage from "@/uttils/MotionForPage/MotionForPage";
const MainLayout = ({children}) => {
    const links = [
        {title: 'Reservations', href: '/reservation'},
        { title: 'Apartments', href: '/apartments' },
        { title: 'Profile', href: '/profile' },
        { title: 'Logout', href: '/logout' },
    ];

    return (
        <MotionForPage>
            <div className="layout">
                <Header links={links} />
                <main className="content">{children}</main>
                <Footer />
            </div>
        </MotionForPage>
    );
};

export default MainLayout;
