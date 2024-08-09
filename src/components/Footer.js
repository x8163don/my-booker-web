import Logo from "../assets/logo/logo.svg"

export default function Footer() {

    return <footer className="footer max-w-7xl mx-auto px-8 py-12 px-4 sm:px-6">
        <aside>
            <img src={Logo} alt="Logo" className="w-12 h-12"/>
            <p>
                MyBooker
            </p>
        </aside>
        {/*<nav>*/}
        {/*    <h6 className="footer-title">{t('footer.services')}</h6>*/}
        {/*    <a className="link link-hover">MyBooker</a>*/}
        {/*</nav>*/}
        {/*<nav>*/}
        {/*    <h6 className="footer-title">{t('footer.legal')}</h6>*/}
        {/*    <a className="link link-hover">{t('footer.legal.terms')}</a>*/}
        {/*    <a className="link link-hover">{t('footer.legal.privacy')}</a>*/}
        {/*</nav>*/}
    </footer>
}