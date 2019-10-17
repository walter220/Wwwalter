import React from 'react';

import img from '../../images/profile_picture.jpg';
import waterfallSmall from '../../images/waterfall_small.jpg';
import rockTower from '../../images/rock_tower.jpg';
import butterfly from '../../images/butterfly.jpg';

const App = () => {
    return (
        <>
            <div className="container">
                <div className="row intro">
                    <div className="col-12 col-sm-auto order-sm-2">
                        <img src={img} className="profile" alt="" />
                    </div>
                    <div className="col-12 col-sm-auto order-sm-1 title">
                        <h1>Walter Jansen</h1>
                        <h2>Front-end webdeveloper</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <p className="text-center u-text-clear u-text-light">
                            Ik ben dit nog wat mooier aan het maken, maar het
                            geeft alvast een leuker idee
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="c-card">
                            <div className="c-card__image-wrapper">
                                <img
                                    className="c-card__image"
                                    src={waterfallSmall}
                                    alt="Waterval"
                                />
                                <div className="c-card__overlay">
                                    <h2 className="c-card__title c-card__title--light">
                                        Introductie
                                    </h2>
                                </div>
                            </div>
                            <div className="c-card__body">
                                <p className="card-text">
                                    Hallo beste bezoeker. Ik zal mij even
                                    voorstellen. Ik ben Walter Jansen, 21 jaar
                                    en kom uit Otterlo, een klein dorpje op de
                                    Veluwe. Ik ben 4e jaars student HBO
                                    informatica, webdevelopment aan de HAN in
                                    Arnhem. Naast school heb zijn mijn hobbies
                                    toneelspelen en muziek maken. Ik zit bij een
                                    klein toneelgezelschap genaamd "Kunst
                                    Veredelt". Ik speel Piano en (elektrische)
                                    gitaar. Mijn voorkeur ligt voornamelijk bij
                                    Rock, Hard Rock en Metal Tot slot ben ik
                                    Junior Front-end developer bij Lukkien in
                                    Ede
                                </p>
                            </div>
                        </div>

                        <div className="c-card">
                            <div className="c-card__image-wrapper align-items-start">
                                <img
                                    className="c-card__image"
                                    src={rockTower}
                                    alt="rock tower"
                                />
                                <div className="c-card__overlay">
                                    <h2 className="c-card__title c-card__title--light">
                                        Projecten
                                    </h2>
                                </div>
                            </div>
                            <div className="c-card__body">
                                <p className="card-text">
                                    Voor mezelf heb ik een aantal projecten
                                    gedaan. Niesjeshof (AngularJS) Voor de
                                    Minicamping Niesjeshof heb ik een nieuwe
                                    site gebouwd. Deze is nu meer geschikt voor
                                    telefoons, tablets en desktops. Daarnaast is
                                    het ontwerp flinkt op de schop gegaan en
                                    heeft het een frisser uiterlijk gekregen.
                                    Bezoek de pagina van de Niesjeshof Op School
                                    heb ik een aantal projecten en casussen
                                    gedaan in verschillende talen. Spotitube
                                    (Java, SpringMVC, ). Een Web applicatie
                                    waarin het idee was dat Spotify en YouTube
                                    met elkaar werden gekoppeld. Hierin zijn
                                    verschillende design patterns gebruikt en
                                    een verbinding met een MySQL database.
                                    Fletnix (C#, ASP.NET Core) Een Web
                                    applicatie welke is gebaseerd op Netflix.
                                    Hierin lag vooral de focus op security en
                                    performance. Zo is er aandacht besteed aan
                                    de OWASP top 10 en perfomance enhancements
                                    als caching.
                                </p>
                            </div>
                        </div>

                        <div className="c-card">
                            <div className="c-card__image-wrapper">
                                <img
                                    className="c-card__image"
                                    src={butterfly}
                                    alt="butterfly"
                                />
                                <div className="c-card__overlay">
                                    <h2 className="c-card__title c-card__title--light">
                                        Vaardigheden
                                    </h2>
                                </div>
                            </div>
                            <div className="c-card__body">
                                <p className="card-text">
                                    Thuis in: HTML5 CSS3 jQuery MsSql MySql
                                    Eerder mee gewerkt: AngularJS BackboneJS C#
                                    Java PHP
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row contact">
                    <div className="col-sm-6">
                        <h3>Contact</h3>
                        <p>
                            Email <br />
                            <a href="mailto:walterjansen96@hotmail.com">
                                walterjansen96@hotmail.com
                            </a>
                        </p>
                        <p>
                            Phone <br />
                            <a href="tel:0627327282">06 27 32 72 82</a>
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h3>Social links</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
