import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const MainLayout = ({children}) => {
    const links = [
        {title: 'Apartments', href: '/apartments'},
        {title: 'Profile', href: '/profile'},
        {title: 'My listing', href: '/booking'},
        {title: 'Logout', href: '/logout'}

    ];



    return (
        <>
            <Header links={links}/>
            {children}
            <Footer/>
        </>
    )
}

export default MainLayout;