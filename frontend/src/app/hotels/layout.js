import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}) => {
    const links = [
        {title: 'Logout', href: '/login'},
        {title: 'My listing', href: '/booking'},
    ];

    return (
        <>
        <Header links={links}/>
        {children}
        <Footer/>
        </>
    )
}

export default Layout;