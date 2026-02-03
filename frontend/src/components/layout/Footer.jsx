import { Link } from "react-router-dom"
import { useTheme } from "next-themes"
import lightLogo from "/TrackWise-Logo-removebg-preview.png"
import darkLogo from "/logo-dark-mode.png"

export default function Footer() {
    const { resolvedTheme } = useTheme();

    const scrollToSection = (e, id) => {
        // If we're on the landing page (pathname is "/"), we can scroll normally
        // If we're on another page, we need to navigate to "/" and then scroll
        // For simplicity in this reusable footer component, we'll assume we link to Landing page anchors relative to root if needed.
        // However, standard anchors #hash work if we are on the page. 
        // A robust solution for cross-page anchor linking usually involves checking location.pathname.
        // For now, we'll keep the simple behavior but point to "/" for Product links if not on landing.

        if (window.location.pathname !== '/') {
            // Let the simple href="/" handle the navigation, or use Link
            return;
        }

        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <Link to="/">
                            <img
                                src={resolvedTheme === 'dark' ? darkLogo : lightLogo}
                                alt="TrackWise Logo"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A minimalist personal expense tracker built for clarity and control. Perfect for first-time budgeters.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {/* Note: Ideally these hash links only work on Landing page. 
                                For other pages, we should probably link to "/#features" etc. 
                                React Router's HashLink or similar is good for this, but simple href="/#id" works too.
                            */}
                            <li><a href="/#features" className="hover:text-primary">Features</a></li>
                            <li><a href="/#security" className="hover:text-primary">Security</a></li>
                            <li><a href="/#how-it-works" className="hover:text-primary">Pricing (Always Free)</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/help-center" className="hover:text-primary">Help Center</Link></li>
                            <li><Link to="/contact-us" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-12 mt-12 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} TrackWise. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
