window.addEventListener("load", function () {
CookieConsent.run({
    page_scripts: true,
    guiOptions: {
        consentModal: {
            layout: "cloud",
            position: "bottom center",
            equalWeightButtons: false,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            enabled: true
        }
    },
    language: {
        default: "pl",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "Hello traveller, it's cookie time!",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms and conditions</a>"
                },
                preferencesModal: {
                    title: "Consent Preferences Center",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Cookie Usage",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "More information",
                            description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"#yourdomain.com\">contact me</a>."
                        }
                    ]
                }
            },
            pl: {
                consentModal: {
                    title: "Ta strona używa plików cookies",
                    description: "Używam plików cookie do analizowania ruchu na stronie. Możesz wyłączyć skrypty śledzące w ustawieniach",
                    acceptAllBtn: "Akceptuj",
                    showPreferencesBtn: "Ustawienia"
                },
                preferencesModal: {
                    title: "Ustawienia plików cookies",
                    acceptAllBtn: "Akceptuj",
                    savePreferencesBtn: "Zapisz ustawienia",
                    closeIconLabel: "Zamknij",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Wykorzystanie plików cookie",
                            description: "Ponieważ szanuje Twoje prawo do prywatności, możesz nie zezwalać na niektóre rodzaje plików cookie. Kliknij nagłówki kategorii, żeby zmienić domyślne ustawienia."
                        },
                        {
                            title: "Niezbędne pliki cookie<span class=\"pm__badge\">Zawsze aktywne</span>",
                            description: "Zazwyczaj są one ustawiane wyłącznie w odpowiedzi na podejmowane przez Ciebie działania, które są równoznaczne z żądaniem usług, jak np. ustawienie preferencji dotyczących prywatności, logowanie czy wypełnianie formularzy. Możesz ustawić swoją przeglądarkę tak, aby blokowała lub ostrzegała Cię o tych plikach cookie, ale niektóre części witryny nie będą wtedy działać. Te pliki cookie nie przechowują żadnych danych osobowych.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analityczne pliki cookie",
                            description: "Te pliki cookie mogą być ustawiane za pośrednictwem naszej witryny przez naszych partnerów reklamowych. Mogą być one wykorzystywane przez te firmy do tworzenia profilu Twoich zainteresowań i wyświetlania odpowiednich reklam w innych witrynach. Nie przechowują bezpośrednio danych osobowych, ale opierają się na jednoznacznej identyfikacji Twojej przeglądarki i urządzenia internetowego. ",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Więcej informacji",
                            description: "W przypadku jakichkolwiek pytań związanych z polityką dotyczącą plików cookie, proszę <a class=\"cc__link\" href=\"mailto:kontakt@futurewebstudio.pl\">skontaktuj się</a>."
                        }
                    ]
                }
            }
        }
    }
});
});
