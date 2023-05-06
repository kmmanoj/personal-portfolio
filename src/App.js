import Introduction from './components/Introduction.js';
import Experience from './components/Experience.js';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader.js';

import "semantic-ui-css/semantic.min.css";

export default function App() {
    return (
        <div>
            <SiteHeader />
            <Introduction />
            <Experience />
            <SiteFooter />
        </div>
    );
}           