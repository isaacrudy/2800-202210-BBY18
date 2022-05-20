class GlobalHeader extends HTMLElement
{
    connectedCallback() {
        this.innerHTML = `
        <div class="menu_wrapper">
            <input type="checkbox" class="toggler">
            <div class="hamburger"><div>
            </div>
        </div>

        <div class="menu">
            <div>
                <div>
                    <nav>
                        <ul id="nav_ul">
                            <li><a href="/"><span>Home</span></a></li>
                            <li><a href="charities.html"><span>Charities</span></a></li>
                            <li><a href="#"><span>About Us</span></a></li>
                            <li><a href="/faq"><span>FAQ</span></a></li>
                            <li><a href="#"><span>Shop</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    <header class="header_bar">
        <div id="filler">
        </div>

        <div>
            <img id="fundcart_logo" src="/img/Logos/cart_logo_vertical_mobile.png" alt="FundCart Logo">
            <img id="fundcart_logo_alt" src="/img/Logos/fundcart_full_logo.png" alt="FundCart Logo">
        </div>

        <div id='account_buttons'>
            <button onclick="signout()" id="sign_out">Logout</button>
        </div>
    </header>
        `
    }
}

class GlobalFooter extends HTMLElement
{
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <section>
                    <div>
                        <ul id="sitemap">
                            <li><a href="#"><span>Home</span></a></li>
                            <li><a href="#"><span>Sign in / Register</span></a></li>
                            <li><a href="/charities"><span>Charities</span></a></li>
                            <li><a href="#"><span>About Us</span></a></li>
                            <li><a href="/faq"><span>FAQ</span></a></li>
                            <li><a href="#"><span>Contact</span></a></li>
                            <li><a href="#"><span>Shop</span></a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Follow Us!</h3>

                        <ul id="footer_socials">
                            <li>
                                <a href="#">
                                    <i class="fab fa-facebook-square"></i>
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p>
                            <i class="far fa-copyright"></i>
                            2022 - FundCart
                        </p>
                    </div>

                </section>
            </footer>
        `
    }
}

customElements.define('global-footer', GlobalFooter)
customElements.define('global-header', GlobalHeader)
loggedIn();

function loggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        document.getElementById("account_buttons").innerHTML =
            "<div id='profile_dropdown_content'> " + 
            "<input type='button' value='My timeline' id='my_timeline_btn'>" + 
            "<input type='button' value='Account Management' id='accocunt_management'>" + 
            "<input type='button' value='Donation History' id='donation_history_btn'>" + 
            "<input type='button' value='Logout' id='logout_btn' onclick='signout()'> </div>"
    } else {
        document.getElementById("account_buttons").innerHTML =
            "<button onclick='signout()' id='sign_out'>Logout</button>"
    }
}